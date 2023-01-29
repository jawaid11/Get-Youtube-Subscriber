const express = require("express");
const { ObjectId } = require("mongodb");
const Subscriber = require("./models/subscribers");
const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", (req, res) => {
res.send("Hello !!! This project is made by Jawaid Hussain");
});

// sending get request to the subscriber list

 app.get("/subscribers", async(req, res) => {
    try{
        const subscribersList = await Subscriber.find({});
        res.status(200).send(subscribersList);

    } catch(err){
            //if any error present, return a status code of 500 
            res.status(500).send(serr);
            console.log(err)
          }
    });
    // creating subscriber list 
    app.post("/subscribers", async(req, res) => {
      try{
        const user = new Subscriber(req.body);
        console.log(req.body)
        const createSubscriber = await user.save();
        res.status(200).send(createSubscriber);

      }catch(err){
            res.status(500).send(err);
            console.log(err)
          }
    })

    module.exports = app;