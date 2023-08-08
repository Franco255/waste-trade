const express = require('express');
const router = express.Router();
const Consumer = require('../models/consumer');

router.get('/', (req, res) => {
    res.render('consumerRegister.ejs');
})

router.post('/', (req, res) => {
    var name = req.body.username;
    var phoneNumber = req.body.No;
    var email = req.body.email;
    var pass = req.body.password;

    Consumer.register({username: name, number: phoneNumber, email: email, active: false}, pass);

    res.send('Registration success')
})

module.exports = router