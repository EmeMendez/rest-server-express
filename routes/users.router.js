const { Router } = require('express');
const router = Router();
const { createValidation } = require('../validators/user.validator');

const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/users.controller');


router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', createValidation ,createProduct);

router.patch('/:id', updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;