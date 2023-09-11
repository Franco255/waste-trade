require('dotenv').config();
const mongoose = require('mongoose');

//connect to mongodb atlas using uri
let uri = process.env.MONGO_URI;
uri = uri.replace('<password>', process.env.MONGO_PASS);

mongoose.connect(uri);

//creating the model
const chatSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    recipient: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//this is not final will change based on how it performs

//export the model
const ChatModel = mongoose.model('ChatModel', chatSchema)

module.exports = ChatModel