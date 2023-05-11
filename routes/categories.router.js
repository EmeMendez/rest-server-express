const { Router } = require('express');
const { createCategoryValidation, getCategoryValidation, updateCategoryValidation, deleteCategoryValidation } = require('../validators/category.validator');
const { validatorJWT } = require('../middlewares/validator-auth');
const { 
    getCategory, 
    createCategory, 
    getCategories,
    updateCategory, 
    deleteCategory 
} = require('../controllers/categories.controller');

const { validateRole }= require('../middlewares/validator-role');

const router = Router();

router.get('/', [validatorJWT, validateRole('ADMIN','USER')] ,getCategories);

router.get('/:id', [ validatorJWT, validateRole('ADMIN','USER') ,getCategoryValidation ] , getCategory);

router.post('/', [ validatorJWT, validateRole('ADMIN'),createCategoryValidation ] ,createCategory);

router.put('/:id', [ validatorJWT, validateRole('ADMIN') ,updateCategoryValidation ], updateCategory);

router.delete('/:id', [ validatorJWT, validateRole('ADMIN') ,deleteCategoryValidation ] ,deleteCategory);

module.exports = router;