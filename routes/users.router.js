const { Router } = require('express');
const { createUserValidation, updateUserValidation, getUserValidation, deleteUserValidation } = require('../validators/user.validator');
const { validatorJWT } = require('../middlewares/validator-auth');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateRole }= require('../middlewares/validator-role');

const router = Router();

router.get('/', [validatorJWT, validateRole('ADMIN','USER')] ,getUsers);

router.get('/:id', [ validatorJWT, validateRole('ADMIN','USER') ,getUserValidation ] , getUser);

router.post('/', [ validatorJWT, validateRole('ADMIN') ,createUserValidation ] ,createUser);

router.put('/:id', [ validatorJWT, validateRole('ADMIN') ,updateUserValidation ], updateUser);

router.delete('/:id', [ validatorJWT, validateRole('ADMIN') ,deleteUserValidation ] ,deleteUser);

module.exports = router;
