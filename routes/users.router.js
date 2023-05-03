const { Router } = require('express');
const router = Router();
const { createUserValidation, updateUserValidation, getUserValidation, deleteUserValidation } = require('../validators/user.validator');

const { getUsers, getUser, createUser, updateUser, deleteProduct } = require('../controllers/users.controller');


router.get('/', getUsers);

router.get('/:id', getUserValidation , getUser);

router.post('/', createUserValidation ,createUser);

router.patch('/:id', updateUserValidation, updateUser);

router.delete('/:id', deleteUserValidation ,deleteProduct);

module.exports = router;
