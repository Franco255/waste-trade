require('dotenv').config();
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

//connect to mongodb using uri
let uri = process.env.MONGO_URI
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri)


//create the model
const businessSchema = new mongoose.Schema({
    username: String,
    number: Number,
    password: String,
    type: String,
    tokenAmount: Number
});

//configure passport plugin
businessSchema.plugin(passportLocalMongoose);

//export the model
const Business = mongoose.model('Business', businessSchema)

module.exports = Business