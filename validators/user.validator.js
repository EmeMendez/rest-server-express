const { check } = require('express-validator');
const validateResults = require('../middlewares/validator');
const User = require('../models/user');

const createValidation = [
    check('name')
        .notEmpty(),

    check('lastname')
        .notEmpty(),

    check('password')
        .isLength({ min: 6 }),

    check('email')
        .isEmail()
        .custom( (email) => {//validation unique in database
            return User.findOne({ where: { email } })
            .then(() => {
            return Promise.reject('Email already taken');
            })
        }),

    check('avatar')
        .notEmpty(),

    check('role')
        .isIn(['ADMIN', 'USER']),

    (req, res, next) => validateResults(req, res, next)
];

module.exports = { createValidation };