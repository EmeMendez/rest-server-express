const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const validateResults = require('../middlewares/validator');
const User = require('../models/user');

const loginValidation = [

    check('email')
    .notEmpty().withMessage('El correo electrónico es requerido')
    .isEmail().withMessage('El formato de correo electrónico no es válido')
    .custom(async (email, {req}) => {
        const user = await User.findOne({ email : email });
        if (!user) {
            throw new Error('El usuario no es válido');
        }
        if (!user.isActive) {
            throw new Error('El usuario no es válido');
        }
        const { password } = req.body;
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if(!isValidPassword){
            throw new Error('El usuario no es válido');
        }
    }),
    check('password').notEmpty().withMessage('La constraseña es obligatoria'),

    (req, res, next) => validateResults(req, res, next)
];

module.exports = {
    loginValidation
};