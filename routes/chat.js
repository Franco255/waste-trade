// chat.js router
module.exports = function (io) {
    require('dotenv').config();
    const express = require('express');
    const router = express.Router();
    const { MongoClient } = require('mongodb');
    const Chat = require('../models/chatModel');

    // Connecting with the MongoDB URI
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    const connectedUsers = {};//initializing an empty object to store users

    io.on('connection', (socket) => {
        // sending stored messages
        async function fetchMessages() {
            const db = client.db('test');
            const chatmodels = db.collection('chatmodels');

            const chatData = await chatmodels.find({}).project({_id: 0}).toArray();
            // console.log(chatData);
            
            //sending the messages to display
            socket.emit('loadMessages', chatData);
        }
        fetchMessages();

        console.log(`User ${socket.id} connected`);
        //checking if the user is logged in
        socket.on('login', (username) => {
            connectedUsers[username] = socket;
            socket.username = username;

            socket.join(username);

            //broadcast to all user that a user has joined(not important)
            io.emit('user-joined', username);
            console.log(username);
        })

        // Handle private messaging between two users
        socket.on('private-message', ({ sender, recipient, message }) => {
            console.log(sender, recipient);

            // Save the message to the database
            const newMessage = new Chat({
                sender: sender,
                recipient: recipient,
                text: message,
            });
            newMessage.save();

            // Emit the message to both sender and recipient
            socket.broadcast.emit('message', message)

        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);

            delete connectedUsers[socket.username];
        });
    });

    router.get('/:recipient', (req, res) => {
        const { recipient } = req.params;
        const sender = req.session.username;
        console.log(sender);
        if(sender !== undefined){
            // Pass the recipient's name to the chat.ejs template
            res.render('chat.ejs', { recipient, sender }); 
        } else {
            res.send('make sure that you are logged in to use messaging feature')
        }
    });

    return router;
};
