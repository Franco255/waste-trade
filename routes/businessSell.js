const express = require('express');
const router = express.Router();
const BusinessSellModel = require('../models/businessSellModel');
const {upload} = require('../utils/fileHelper');

router.get('/:name', (req, res) => {
    const {name} = req.params;
    res.render('businessSell.ejs', {query: name})
})

router.post('/:name', upload.single('productImage'), (req, res) => {

    const {name} = req.params;

    var productName = req.body.productName;
    var productQuantity = req.body.productQuantity;
    var productDescription = req.body.productDescription;

    let newProduct = new BusinessSellModel({
        businessName: name, 
        productName: productName, 
        quantity: productQuantity, 
        description: productDescription
    })

    newProduct.save((newProduct));

    res.send('upload Success...');
})

module.exports = router