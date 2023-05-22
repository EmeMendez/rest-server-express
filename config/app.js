require('dotenv').config();


module.exports = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    privateKey: process.env.PRIVATE_KEY
}