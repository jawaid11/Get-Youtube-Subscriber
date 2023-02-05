const express = require("express");

const Subscriber = require("./models/subscribers");
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello !!! This project is made by Jawaid Hussain");
});

// sending get request to the subscriber list

app.get("/subscribers", async (req, res) => {
  try {
    const subscribersList = await Subscriber.find({});
    res.status(200).send(subscribersList);

  } catch (err) {
    //if any error present, return a status code of 500
    res.status(500).send(err);
    console.log()
  }
});
 
// getting perticular subscriber data by name
app.get("/subscribers/:names", async (req, res) => {
  try {
    // To retrieve a list of subscribers
    const subscriberDataByName = await Subscriber
    .find({name : req.params.names})
    .select("-__v -_id -subscribedDate");

    // If successful, send a response with a status code of 200 and the list of subscribers
    res.status(200).send(subscriberDataByName);
  } catch (err) {
    // If error occurs, send a response with a status code of 500 and an error message
    res.status(500).send(err);
  } 
});

// getting perticular subscriber data by Id
app.get("/subscribers/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const subscriberData = await Subscriber.findById(_id).select("-__v -_id -subscribedDate");
    if(!subscriberData) {
      return res.status(404).send();
    }else{
      res.status(200).send(subscriberData);
    }
  } catch (err) {
    res.status(400).send(err);
    console.log({ err: "Invalid ID URL" })
  }
});

// creating subscriber list 
app.post("/subscribers", async (req, res) => {
  try {
    const user = new Subscriber(req.body);
    console.log(req.body)
    const createSubscriber = await user.save().then(() => {
      res.send(user);
    }).catch((e) => {
      res.send(e)
    });
    res.status(200).send(createSubscriber);
  } catch (err) {
    res.status(500).send(err);
    console.log({ err: "Cannot add the element" })
  }
});

//update perticular element by subscriber by its id
app.patch("/subscribers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateSubscriber = await Subscriber.findByIdAndUpdate(_id, req.body, {
      new: true
    })
    res.status(200).send(updateSubscriber);
  } catch (err) {
    res.status(400).send(err);
    console.log({ err: "Invalid Id" })
  }
});

//update all element by subscriber by its id
app.put("/subscribers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateSubscriber = await Subscriber.findByIdAndUpdate(_id, req.body, {
      new: true
    })
    res.status(200).send(updateSubscriber);
  } catch (err) {
    res.status(500).send(err);
    console.log({ err: "Cannot update the element" })
  }
});

// delete a perticular element subcriber by its id
app.delete("/subscribers/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const delateSubscriber = await Subscriber.findByIdAndDelete(_id);
    res.status(200).send(delateSubscriber);
  } catch (err) {
    res.status(500).send(err);
    console.log({ error: "Cannot delete the element" })
  }
});


module.exports = app;