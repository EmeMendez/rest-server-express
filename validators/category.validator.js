const { check }         = require('express-validator');
const validateResults   = require('../middlewares/validator');
const Category          = require('../models/category');

const validCategory = async (id) => {
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        throw new Error('El id no es válido')
    }
    const existingCategory = await Category.findOne({ '_id': id }); 
    if(!existingCategory){
            throw new Error('El id no es válido')
    }
}

const createCategoryValidation = [
    check('name')
    .custom(async (name) => {
        const existingCategory = await Category.findOne({ name: name.toUpperCase() }); 
        if (existingCategory) {
            throw new Error('Category already exists')
        }
    }),
    (req, res, next) => validateResults(req, res, next)
];


const updateCategoryValidation = [
    check('name')
    .custom(async (name, {req}) => {
        const existingCategory = await Category.findOne({ name: name.toUpperCase() });
        if(existingCategory){
            if (existingCategory._id.toString() != req.params.id) {
                throw new Error('La categoría ya se encuentra registrada');
            }
        }
    }),
    (req, res, next) => validateResults(req, res, next)
];

const getCategoryValidation = [
    check('id')
    .custom(validCategory),
    (req, res, next) => validateResults(req, res, next)
];

const deleteCategoryValidation = [
    check('id')
    .custom(validCategory),
    (req, res, next) => validateResults(req, res, next)
];



module.exports = { 
    createCategoryValidation, 
    getCategoryValidation, 
    updateCategoryValidation, 
    deleteCategoryValidation 
};