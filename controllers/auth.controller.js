const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async ( req, res ) => {
    try{
        const { email } = req.body;
        const user = await User.findOne({ email });
        const token = await generateJWT(user.id);
        res.json({ user, token })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Error interno, por favor comuniquese con el administrador'
        });
    }
    
};

module.exports = {
    login
}