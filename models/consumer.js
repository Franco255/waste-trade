require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//connect to mongodb using uri
let uri = process.env.MONGO_URI
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri)

//create the model
const consumerSchema = new mongoose.Schema({
    username: String,
    number: String,
    email: String,
    password: String,
    walletPass: String,
    tokenAmount: Number
});

//configure passport plugin
consumerSchema.plugin(passportLocalMongoose);

//export the model
const Consumer = mongoose.model('Consumer', consumerSchema)

module.exports = Consumer