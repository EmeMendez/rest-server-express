const { Router } = require('express');
const router = Router();
const { createUserValidation, updateUserValidation, getUserValidation, deleteUserValidation } = require('../validators/user.validator');

const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller');


router.get('/', getUsers);

router.get('/:id', getUserValidation , getUser);

router.post('/', createUserValidation ,createUser);

router.put('/:id', updateUserValidation, updateUser);

router.patch('/:id', deleteUserValidation ,deleteUser);

module.exports = router;
