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

            const productsWithImages = await businesssellmodels.find({}).toArray();

            const productData = productsWithImages.map(product => {
                const imageDataBuffer = product.image.data;
                console.log(imageDataBuffer);

                return {
                    ...product,
                    imageDataBase64: `data:${product.image.mimeType};base64,${imageDataBuffer}`
                };
            });
            const productDataJson = JSON.parse(JSON.stringify(productData));

            // res.render('consumerBrowse.ejs', {productData});
            res.json(productDataJson);
        } finally {
            await client.close();
        }
    }

    businessProducts()

})

router.get('/consumerBrowseView', (req, res) => {
    res.render('consumerBrowse.ejs');
})

// router.get('/consumerBrowseView', (req, res) => {
//     //fetch from business db
//     let uri = process.env.MONGO_URI;
//     uri = uri.replace('<password>', process.env.MONGO_PASS);

//     const client = new MongoClient(uri);

//     async function getImages() {
//         try{
//             const db = client.db('test');
//             const businesssellmodels = db.collection('businesssellmodels');
    
//             const productImages = await businesssellmodels.find({}).toArray();
//             console.log(productImages);
//             const imageArray = productImages.map(productImages => {
//                 const imgDataBuffer = productImages[image].buffer;
//                 const imgDataBase64 = imgDataBuffer.toString('base64');
//                 return imgDataBase64
//             })
//             res.render('consumerBrowse.ejs', { imageArray });
//         }finally {
//             await client.close()
//         }
//     }
    
//     getImages();
// })

module.exports = router