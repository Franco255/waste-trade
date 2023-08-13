require('dotenv').config();
const express = require('express');
const router = express.Router();
const {MongoClient} = require('mongodb');

router.get('/:name', (req, res) => {
    const {name} = req.params
    console.log(name);

    //querying the database to get the number of tokens available
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    async function fetchTokenAmount() {
        try {
            const db = client.db('test');
            const consumers = db.collection('consumers');

            const consumerDetails = await consumers.find({username: name}).toArray();
            const tokenAmount = consumerDetails[0].tokenAmount;
            console.log(tokenAmount);
        } finally {
            await client.close();
        }
    }

    fetchTokenAmount()

    res.render('consumerDashboard.ejs', {query: name});
})

module.exports = router
