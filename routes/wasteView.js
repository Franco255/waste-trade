require('dotenv').config();
const express = require('express');
const router = express.Router();
const {MongoClient, ObjectId} = require('mongodb');

router.get('/', (req, res) => {
    const wasteId = req.query.wasteId

    //fetching logic
    let uri = process.env.MONGO_URI;
    uri = uri.replace('<password>', process.env.MONGO_PASS);

    const client = new MongoClient(uri);

    async function wasteDetails() {
        try {
            const db = client.db('test');
            const consumersellmodels = db.collection('consumersellmodels');

            var id = new ObjectId(wasteId)
            
            const options = {
                projection: {
                    _id: 0, 
                    consumerName: 1, 
                    wasteType: 1, 
                    quantity: 1, 
                    description: 1, 
                    image: 1
                }
            }

            const details = await consumersellmodels.find({_id: id}, options).toArray()

            const detailsWithImage = details.map(product => {
                const imageDataBuffer = product.image.data;
                
                return {
                    ...product,
                    imageDataBase64: `data:${product.image.mimeType};base64,${imageDataBuffer}`
                };
            });
            
            console.log(detailsWithImage);
            res.render('wasteView.ejs', {details: detailsWithImage})
        } finally {
            await client.close();
        }
    }

    wasteDetails();
});

// router.get('/wasteItem', (req, res) => {
//     res.render('wasteView.ejs');
// })

module.exports = router