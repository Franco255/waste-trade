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
    //add the quantity, username, and productId to the collection
    const consumerName = req.session.username;
    const quantity = req.body.quantity;
    const productId = req.body.productId;
    const redirectUrl = req.body.redirectUrl;

    const newItem = new cartModel({
        consumerName: consumerName,
        productId: productId,
        quantity: quantity
    });
    newItem.save();

    res.redirect(redirectUrl)
})

module.exports = router