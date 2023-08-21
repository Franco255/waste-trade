require('dotenv').config();
const mongoose = require('mongoose');

//connect to mongodb atlas using the uri
let uri = process.env.MONGO_URI
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri)

//create the model
const buinessSellSchema = new mongoose.Schema({
    businessName: String,
    productName: String,
    quantity: Number,
    description: String,
    image: {
        data: Buffer,
        mimeType: String
    }
});

//export the model
const BusinessSellModel = mongoose.model('BusinessSellModel', buinessSellSchema)

module.exports = BusinessSellModel