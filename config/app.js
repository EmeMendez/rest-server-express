require('dotenv').config();


module.exports = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    publicOrPrivateKey: process.env.PUBLIC_OR_PRIVATE_KEY
}