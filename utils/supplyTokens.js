require('dotenv').config();
const {MongoClient} = require('mongodb');

let uri = process.env.MONGO_URI
uri = uri.replace('<password>', process.env.MONGO_PASS);

const client = new MongoClient(uri);

async function supplyTokens() {
    try{
        const db = client.db('test');
        const businesses = db.collection('businesses');

        var newTokenAmount = {$set: {tokenAmount: 0}};
        await businesses.updateMany({}, newTokenAmount);

        //adding tokens 
        var updatedDocument = await businesses.aggregate(
            [
                {
                    $set: {
                        tokenAmount: {$add: ['$tokenAmount', 0]}
                    }
                }
            ]
        ).toArray()
        // console.log(updatedToken);
        //persisting to the collection
        //updating only one document:...
        // await businesses.updateOne({username: 'cello'}, {$set: {tokenAmount: updatedDocument[0].tokenAmount}})

        //updating all documents/multiple documents
        await businesses.updateMany({}, {$set: {tokenAmount: updatedDocument[0].tokenAmount}})
        //checking if it was succesfull
        const businessData = await businesses.find().toArray()
        console.log(businessData[0].tokenAmount);
    }finally {
        await client.close();
    }
}

supplyTokens();
