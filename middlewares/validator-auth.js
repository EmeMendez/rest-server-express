const jwt       = require('jsonwebtoken');
const config    = require('../config/app');
const User      = require('../models/user');

const validatorJWT =  async ( req, res, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({ msg: 'Unauthorized'});
    }
    try {
        const { uuid }  = jwt.verify(token, config.publicOrPrivateKey);
        const user      = await User.findById(uuid);
        if(!user){
            return res.status(401).json({ msg: 'Unathorized'});
        }
        if(!user.isActive){
            return res.status(401).json({msg: 'Unauthorized'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Unauthorized'});
    }
};

module.exports = { validatorJWT };