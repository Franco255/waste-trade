const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('consumerLogin.ejs');
})

router.post('/', passport.authenticate('consumerLocal', {
    failureRedirect: '/consumerRegister'
}), (req, res) => {
    const name = req.body.username;
    console.log(name);
    // res.send('login success')
    res.redirect(`/consumerDashboard/${name}`)
})

module.exports = router