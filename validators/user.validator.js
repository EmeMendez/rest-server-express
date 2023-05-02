const { check } = require('express-validator');
const validateResults = require('../middlewares/validator');
const User = require('../models/user');


const nameValidation = check('name')
    .notEmpty()
    .withMessage("El nombre es requerido");

const lastNameValidation = check('lastname')
    .notEmpty()
    .withMessage("El apeliido es requerido");

const passwordValidation = check('password')
    .isLength({ min: 6 })
    .withMessage("La contrasena no puede ser menor a 6 dígitos");

const avatarValidation = check('avatar')
    .notEmpty()
    .withMessage("El avatar es requerido");

const roleValidation = check('role')
    .isIn(['ADMIN', 'USER'])
    .withMessage("El rol no es válido");


const createValidation = [
    nameValidation,
    lastNameValidation,
    passwordValidation.notEmpty().withMessage("La contrasena es requerida"),
    check('email').notEmpty().isEmail()
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


const updateValidation = [
    check('id')
    .isMongoId()
    .withMessage("El id no es válido")
    .custom(async (id) => {
        const existingUser = await User.findOne({ _id: id }); 
        if(!existingUser){
                throw new Error('El id no es válido')
        }
    }),

    nameValidation,
    lastNameValidation,
    check('email').notEmpty().isEmail()
    .custom(async (email, {req}) => {
        const { id } = req.params;
        const existingUser = await User.findOne({ _id: id }); 
        if(existingUser){
            if (existingUser._id.toString() != id) {
                throw new Error('El correo ya se encuentra registrado')
            }
        }
    }),
    avatarValidation,
    roleValidation,
    (req, res, next) => validateResults(req, res, next)
];



module.exports = { createValidation, updateValidation };