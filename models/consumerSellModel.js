require('dotenv').config();
const mongoose = require('mongoose');

//connecting to mongodb using the uri
let uri = process.env.MONGO_URI
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri)

//creating the model
const consumerSellSchema = new mongoose.Schema({
    consumerName: String,
    wasteType: String,
    quantity: Number,
    description: String
});

//export the model
const ConsumerSellModel = mongoose.model('ConsumerSellModel', consumerSellSchema)

module.exports = ConsumerSellModel