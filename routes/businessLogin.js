const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('businessLogin.ejs');
})

router.post('/', passport.authenticate('businessLocal', {
    failureRedirect: '/businessRegister'
}), (req, res) => {
    const businessName = req.body.username;
    req.session.username = businessName;

    // res.send('login success')
    res.redirect(`/businessDashboard/${businessName}`)
})

module.exports = router