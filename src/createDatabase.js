const mongoose = require("mongoose");



// Connect to DATABASE
mongoose.set('strictQuery', true);
const DATABASE_URL = "mongodb+srv://jawaidhussain:J%40waid001@cluster0.qfkyqgd.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database created...'));