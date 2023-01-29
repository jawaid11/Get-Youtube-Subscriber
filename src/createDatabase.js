const mongoose = require("mongoose");
const Subscriber = require('./models/subscribers');
const data = require('./data');


// Connect to DATABASE
mongoose.set('strictQuery', true);
const DATABASE_URL = "mongodb+srv://jawaidhussain:J%40waid001@cluster0.qfkyqgd.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(DATABASE_URL);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database created...'));

const refreshAll = async () => {
    await Subscriber.deleteMany({})
    //  console.log(connection)
    await Subscriber.insertMany(data)
    await mongoose.disconnect();
}
refreshAll()