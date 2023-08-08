require('dotenv').config();
const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');

router.get('/', (req, res) => {
    //fetch from business db
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    async function businessProducts() {
        try {
            const db = client.db('test');
            const businesssellmodels = db.collection('businesssellmodels');

            const productDetails = await businesssellmodels.find().toArray();
            let productDetailsJson = JSON.parse(JSON.stringify(productDetails));

            res.json(productDetailsJson)
        } finally {
            await client.close();
        }
    }

    businessProducts()

})

router.get('/consumerBrowseView', (req, res) => {
    res.render('consumerBrowse.ejs');
})

module.exports = router