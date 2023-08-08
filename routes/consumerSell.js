const express = require('express');
const router = express.Router();
const ConsumerSellModel = require('../models/consumerSellModel');
const {upload} = require('../utils/fileHelper')

router.get('/:name', (req, res) => {
    const {name} = req.params;
    res.render('consumerSell.ejs', {query: name})
})

router.post('/:name', upload.single('wasteImage'), (req, res) => {

    const {name} = req.params;

    console.log(req.file.path);
    var wasteType = req.body.wasteType;
    var quantity = req.body.quantity;
    var desc = req.body.description;

    let newWaste = new ConsumerSellModel({consumerName: name, wasteType: wasteType, quantity: quantity, description: desc});

    newWaste.save((newWaste));

    res.send('post success...');
})

module.exports = router