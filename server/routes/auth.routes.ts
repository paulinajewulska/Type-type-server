const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controller");

const { validateRegister, validateLogin } = require('../validators/authValidator');
const checkValidation = require('../validators/checkValidation');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

module.exports = router;