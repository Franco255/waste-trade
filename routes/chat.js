module.exports = function (io) {
    const express = require('express');
    const router = express.Router();

    router.get('/', (req, res) => {
        // const {name} = req.params;
        res.render('chat.ejs');
    })

    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);

        socket.on('message', (msg) => {
            //should handle the incoming messages here
            // io.emit('message', msg);
            socket.broadcast.emit('message', msg)
            // socket.emit('message', 'welcome to the chat');
        });
    
        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    
    })

    return router;
};