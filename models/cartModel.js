require('dotenv').config();
const mongoose = require('mongoose');

//connecting to mongodb atlas using uri
let uri = process.env.MONGO_URI;
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri);

//creating the model
const cartSchema = new mongoose.Schema({
    consumerName: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

//exporting the model
const CartModel = mongoose.model('CartModel', cartSchema);

module.exports = CartModel