//route for cart
require('dotenv').config();
const express = require('express');
const router = express.Router();
const cartModel = require('../models/cartModel');
const {MongoClient, ObjectId} = require('mongodb');

router.get('/:name', (req, res) => {
    const {name} = req.params

    //fetch the cart items from collection to display in views
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    async function fetchFromCartModel() {
        try {
            const db = client.db('test');
            const cartmodels = db.collection('cartmodels');
            const businesssellmodels = db.collection('businesssellmodels');

            const cartItems = await cartmodels.find({consumerName: name}).toArray();
            //use loop to iterate over the array
            var cartItemsDetails = [];
            var quantity = [];
            var cartItemsDetailsImage = [];

            for(var i = 0; i < cartItems.length; i++) {
                var productId = cartItems[i].productId;
                quantity[i] = cartItems[i].quantity;

                var id = new ObjectId(productId);

                cartItemsDetails[i] = await businesssellmodels.find({_id: id}).toArray();

                cartItemsDetailsImage[i] = cartItemsDetails[i].map(product => {
                    var imageDataBuffer = product.image.data;

                    return {
                        ...product,
                        imageDataBase64: `data:${product.image.mimeType};base64,${imageDataBuffer}`
                    };
                });
            }
            //turning into a one dimensional array
            const cartItemsOne = cartItemsDetailsImage.flat();
            res.render('cart.ejs', {items: cartItemsOne, quantity: quantity})
        } finally {
            await client.close()
        }
    }
    fetchFromCartModel()
    // res.render('cart.ejs');
})


router.post('/addToCart', (req, res) => {
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