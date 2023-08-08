const express = require('express');
const router = express.Router();
const Business = require('../models/business');

router.get('/', (req, res) => {
    res.render('businessRegister.ejs');
})

router.post('/', (req, res) => {
    var name = req.body.name;
    var pass = req.body.password;
    var type = req.body.businessType;

    Business.register({username: name, type: type, active: false}, pass)

    res.send('registration success')
})

module.exports = router