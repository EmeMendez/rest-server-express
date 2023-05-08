const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    const { limit, offset, is_active } = req.query;
    const query = { isActive : is_active};

    const [ total, users ] = await Promise.all([
        User.count(query),
        User.find(query)
            .skip(Number(offset))
            .limit(Number(limit))
    ]);
    res.json({
        total,
        users,
    });
};

const getUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({ '_id': id });
    res.json(user);
};

const createUser = async (req, res) => {
    const { name, lastname, email, password, role, avatar } = req.body;
    const user = new User({name, lastname, email, password, role, avatar });
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt);
    await user.save();
    res.status(201).json(user);
};

const updateUser =  async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, role, avatar } = req.body;
    const user = await User.findOneAndUpdate(
        id, 
        { name, lastname, email, role, avatar },
        { 
            returnDocument: true,
            new: true
        });
    res.json(user);
};
const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isActive : false}, {new: true});
    res.json(user);
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}

