//route for cart
require('dotenv').config();
const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel')

router.get('/', (req, res) => {
    res.render('cart.ejs');
})

router.post('/', (req, res) => {

})

router.post('/addToCart', (req, res) => {

})