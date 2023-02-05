const express = require('express')
const mongoose = require("mongoose");
const app = require("./src/app")

const port = 3000
// Parse JSON bodies (as sent by API clients)
app.use(express.json())

const DATABASE_URL = "mongodb+srv://jawaidhussain:J%40waid001@cluster0.qfkyqgd.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database created...'));
// Start Server
app.listen(port, () => console.log(`App listening on port ${port}!`))
