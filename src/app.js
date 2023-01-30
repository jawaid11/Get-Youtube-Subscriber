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
            res.status(400).send(err);
            console.log(err)
          }
    });
    // getting perticular subscriber data by id
    app.get("/subscribers/:id", async(req, res) =>{
      try{
           // to select id
          const _id = req.params.id;
          const subscriberDataId = await Subscriber.findById(_id);
          res.status(200).send(subscriberDataId);
      }catch(err){
        res.status(500).send(err);
        console.log(err)
      }
    })
    // getting perticular subscriber data by name
    app.get("/subscribers/names", async(req, res) =>{
          try{
           const subcriber = await Subscriber.find();
           res.status(200).send(subcriber);
          }catch(err){
        res.status(400).send(err);
        console.log({ err: "Invalid name URL" })
      }
    });
    // creating subscriber list 
    app.post("/subscribers", async(req, res) => {
      try{
        const user = new Subscriber(req.body);
        console.log(req.body)
        const createSubscriber = await user.save().then(() => {
          res.send(user);
        }).catch((e) => {
          res.send(e)
        });
        res.status(200).send(createSubscriber);
      }catch(err){
            res.status(500).send(err);
            console.log(err)
          }
    });

    //update perticular field by subscriber by its id
   app.patch("/subscribers/:id", async(req, res) => {
         try{
          const _id = req.params.id;
          const updateSubscriber = await Subscriber.findByIdAndUpdate(_id, req.body, {
            new : true
          })
           res.status(200).send(updateSubscriber);
         }catch(err){
            res.status(500).send(err);
            console.log(err)
          }
   });

   //update all field by subscriber by its id
   app.put("/subscribers/:id", async(req, res) => {
    try{
     const _id = req.params.id;
     const updateSubscriber = await Subscriber.findByIdAndUpdate(_id, req.body, {
       new : true
     })
      res.status(200).send(updateSubscriber);
    }catch(err){
       res.status(500).send(err);
       console.log(err)
     }
});

// delete perticular subcriber by its id
app.delete("/subscribers/:id", async(req,res) =>{
  try{
    const _id = req.params.id;
   const  delateSubscriber = await Subscriber.findByIdAndDelete(_id);
   res.status(200).send(delateSubscriber);
  }catch(err){
            res.status(500).send(err);
            console.log(err)
          }
})
    

    module.exports = app;