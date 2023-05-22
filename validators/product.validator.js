const { check } = require('express-validator');
const validationResult = require('../middlewares/validator');
const Category          = require('../models/category');
const Product           = require('../models/product');

const validCategory = async (id) => {
    const errorMessage = 'La categoría no es válida';
    if(!id){
        throw new Error(errorMessage)
    }
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error(errorMessage)
    }
    const existingCategory = await Category.findOne({ '_id': id }); 
    if(!existingCategory){
        throw new Error(errorMessage)
    }
}

const validProduct = async (id) => {
    const errorMessage = 'La id no es válido';
    if(!id){
        throw new Error(errorMessage)
    }
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error(errorMessage)
    }
    const existingProduct = await Product.findOne({ '_id': id }); 
    if(!existingProduct){
        throw new Error(errorMessage)
    }
}

const createProductValidation =  [
    check('name')
    .notEmpty().withMessage('El nombre es requirido'),

    check('category')
    .notEmpty().withMessage('La categoría es requerida')
    .custom(validCategory),

    check('price')
    .notEmpty().withMessage('El precio es requierido')
    .isNumeric().withMessage('El precio debe ser un número')
    .isLength({ max: 11 }).withMessage('El precio no debe superar los once dígitos'),

    check('available')
    .notEmpty().withMessage('La propiedad disponible es requerida')
    .isBoolean().withMessage('La propiedad disponible debe ser boleana'),

    check('files')
    .custom(async (files, {req}) => {
        if(!req.files){
            throw new Error('La imagen es requerida');
        }
        const { image } = req.files;
        if(!image){
            throw new Error('La imagen es requerida');
        }
        const validExtensions = ['png', 'jpg', 'jpeg', 'gift'];
        const  [imageExtension] = image.name.split('.').slice(-1);
        if(!validExtensions.includes(imageExtension)){
            throw new Error(`La extensión de la imagen no es válida, solo se permite ${validExtensions}`);
        }        
    }),
    (req, res, next) => validationResult(req,res, next)

];

const getProductValidation = [
    check('id')
    .custom(validProduct),

    (req, res, next) => validationResult(req,res,next)
];

const deleteProductValidation = [
    check('id')
    .custom(validProduct),

    (req, res, next) => validationResult(req, res, next)
];

const updateProductValidation =  [
    check('id')
    .custom(validProduct),

    check('name')
    .notEmpty().withMessage('El nombre es requirido'),

    check('category')
    .notEmpty().withMessage('La categoría es requerida')
    .custom(validCategory),

    check('price')
    .notEmpty().withMessage('El precio es requierido')
    .isNumeric().withMessage('El precio debe ser un número')
    .isLength({ max: 11 }).withMessage('El precio no debe superar los once dígitos'),

    check('available')
    .notEmpty().withMessage('La propiedad disponible es requerida')
    .isBoolean().withMessage('La propiedad disponible debe ser boleana'),

    check('files')
    .custom(async (files, {req}) => {
        if(req.files){
            const image = req.files.image;
            if(image){
                const validExtensions = ['png', 'jpg', 'jpeg', 'gift'];
                const  [imageExtension] = image.name.split('.').slice(-1);
                if(!validExtensions.includes(imageExtension)){
                    throw new Error(`La extensión de la imagen no es válida, solo se permite ${validExtensions}`);
                }        
            }
        }
    }), 

    (req, res, next) => validationResult(req,res, next)

];

module.exports = {
    createProductValidation,
    getProductValidation,
    deleteProductValidation,
    updateProductValidation
}