const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('businessLogin.ejs');
})

router.post('/', passport.authenticate('businessLocal', {
    failureRedirect: '/businessRegister'
}), (req, res) => {
    res.send('login success')
})

module.exports = router