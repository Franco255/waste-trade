require('dotenv').config();
const AfricasTalking = require('africastalking');

//Initialize Africa's Talking
const africastalking = AfricasTalking({
    apiKey: process.env.AT_API_KEY, 
    username: process.env.AT_USERNAME
})

module.exports = async function sendSMS(phoneNumber, text) {
    try {
        //TODO: fix issue with from==InvalidSenderId, check the AppName
        const result = await africastalking.SMS.send({
            to: phoneNumber,
            message: text,
            from: 'Agro'
        });
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}