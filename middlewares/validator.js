const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => { 
  try {
    validationResult(req).throw();//valida
    return next(); // sino existe un error en la validación, continua con el controlador
  } 
  catch (error) {
    res.status(400);
    res.send({ errors: error.array() });
  }
}

module.exports =  validateResults;