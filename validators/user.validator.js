const { check } = require('express-validator');
const mongoose = require('mongoose');
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


const validUser = async (id) => {
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error('El id no es válido')
    }
    const existingUser = await User.findOne({ '_id': id }); 
    if(!existingUser){
            throw new Error('El id no es válido')
    }
}

const createUserValidation = [
    nameValidation,
    lastNameValidation,
    avatarValidation,
    roleValidation,
    passwordValidation.notEmpty().withMessage("La contrasena es requerida"),
    check('email')
    .notEmpty().withMessage("El correo eletrónico es requerido")
    .isEmail().withMessage("El correo eletrónico no tiene un formato válido")
    .custom(async (email) => {
        const existingUser =await User.findOne({ email }); 
        if (existingUser) {
            throw new Error('Email already in use')
        }
    }),
    (req, res, next) => validateResults(req, res, next)
];


const updateUserValidation = [
    nameValidation,
    lastNameValidation,
    avatarValidation,
    roleValidation,
    check('id')
    .isMongoId()
    .withMessage("El id no es válido")
    .custom(validUser),
    check('email').notEmpty().isEmail()
    .custom(async (email, {req}) => {
        const { id } = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) return
        const existingUser = await User.findOne({ '_id': id }); 
        if(existingUser){
            if (existingUser._id.toString() != id) {
                throw new Error('El correo ya se encuentra registrado')
            }
        }
    }),
    (req, res, next) => validateResults(req, res, next)
];

const getUserValidation = [
    check('id')
    .custom(validUser),
    (req, res, next) => validateResults(req, res, next)
];

const deleteUserValidation = [
    check('id')
    .custom(validUser),
    (req, res, next) => validateResults(req, res, next)
];



module.exports = { 
    createUserValidation, 
    updateUserValidation, 
    getUserValidation, 
    deleteUserValidation 
};