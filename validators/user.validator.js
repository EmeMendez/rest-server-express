const { check } = require('express-validator');
const validateResults = require('../middlewares/validator');
const User = require('../models/user');

const nameValidation        = check('name').notEmpty();
const lastNameValidation    = check('lastname').notEmpty();
const passwordValidation    = check('password').isLength({ min: 6 });
const emailValidation       = check('email').isEmail();
const avatarValidation      = check('avatar').notEmpty();
const roleValidation        = check('role').isIn(['ADMIN', 'USER']);

const createValidation = [
    nameValidation,
    lastNameValidation,
    passwordValidation.notEmpty(),
    emailValidation
    .custom(async (email) => {
        const existingUser =await User.findOne({ email }); 
        if (existingUser) {
            throw new Error('Email already in use')
        }
    }),
    avatarValidation,
    roleValidation,
    (req, res, next) => validateResults(req, res, next)
];




module.exports = { createValidation };