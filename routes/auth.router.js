const { Router } = require('express');
const  { login } = require('../controllers/auth.controller');
const { loginValidation } = require('../validators/auth.validator');

const router = Router();

router.post('/login' , loginValidation, login);

module.exports = router;