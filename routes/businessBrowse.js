require('dotenv').config();
const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');

router.get('/', (req, res) => {
    //fetching logic here
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    async function consumerProducts() {
        try{
            const db = client.db('test');
            const consumersellmodels = db.collection('consumersellmodels');

            const productDetails = await consumersellmodels.find().toArray();
            let productDetailsJson = JSON.parse(JSON.stringify(productDetails));
            
            res.json(productDetailsJson);
        }finally{
            await client.close();
        }
    }
    consumerProducts();
})

router.get('/businessBrowseView', (req, res) => {
    res.render('businessBrowse.ejs');
})

module.exports = router