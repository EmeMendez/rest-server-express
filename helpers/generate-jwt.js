const jwt       = require('jsonwebtoken');
const config    = require('../config/app');

const generateJWT = ( uuid ) => {
    const payload = { uuid };
    try {
        const token = jwt.sign(payload, config.privateKey, {
            expiresIn: '4h'
        });
        return token;
    } catch (error) {
        console.log(error);
    }
}

module.exports =  {
    generateJWT
}