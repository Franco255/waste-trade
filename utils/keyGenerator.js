//generating a random key for the wallet
module.exports = function randomString() {
    let result = '';
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    const characterLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() *
         characterLength));
    }
    return result;
};