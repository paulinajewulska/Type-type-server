const { check } = require('express-validator');

exports.validateRegister = [
    check('username').trim().notEmpty().withMessage('Username is required.'),
    check('username').trim().isLength({ min: 4 }).withMessage('Username must be at least 7 characters long.'),
    check('password').trim().notEmpty().withMessage('Password is required.'),
    check('password').trim().isLength({ min: 7 }).withMessage('Password must be at least 7 characters long.'),
    check('email').trim().notEmpty().withMessage('E-mail is required.'),
    check('email').trim().isEmail().withMessage('Invalid e-mail address.'),
];

exports.validateLogin = [
    check('password').trim().notEmpty().withMessage('Password is required.'),
    check('password').trim().isLength({ min: 7 }).withMessage('Password must be at least 7 characters long.'),
]; 