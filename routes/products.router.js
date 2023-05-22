const { Router } = require('express');
const router = Router();

const { createProduct, getProduct, getProducts, deleteProduct, updateProduct }  = require('../controllers/products.controller')
const { validatorJWT } = require('../middlewares/validator-auth');
const { validateRole } = require('../middlewares/validator-role');
const { createProductValidation, getProductValidation,deleteProductValidation, updateProductValidation} = require('../validators/product.validator');

router.post('/',[ validatorJWT, validateRole('ADMIN'), createProductValidation ], createProduct);

router.get('/',[ validatorJWT, validateRole('ADMIN', 'USER')], getProducts);

router.get('/:id',[ validatorJWT, validateRole('ADMIN', 'USER'), getProductValidation ], getProduct);

router.put('/:id',[ validatorJWT, validateRole('ADMIN'), updateProductValidation ], updateProduct);

router.delete('/:id',[ validatorJWT, validateRole('ADMIN'), deleteProductValidation ], deleteProduct);

module.exports = router;