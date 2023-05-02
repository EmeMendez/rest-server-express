const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

const getProducts = (req, res) => {
    res.json({
        message: 'get users'
    });
};

const getProduct = (req, res) => {
        res.json({
            message: 'get one user',
        });
};

const createProduct = async (req, res) => {
    const { name, lastname, email, password, role, avatar } = req.body;
    const createdAt = Date.now();
    const user = new User({name, lastname, email, password, role, avatar, createdAt });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);
    await user.save();

    res.json({
        message: 'create product',
        user
    });
};

const updateProduct =  async (req, res) => {
    const { _id } = req.params;
    const { name, lastname, email, role, avatar } = req.body;

    const user = await User.findById(
        _id, 
        { name, lastname, email, role, avatar },
         { returnOriginal: false }
        );
    res.json({
        user
    });
};

const deleteProduct = (req, res) => {
    res.json({
        message: 'delete users'
    });
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}