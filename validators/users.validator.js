const { body } = require('express-validator');

exports.UserValidator = [
  body('email').isEmail().normalizeEmail(),
  body('username').not().isEmpty().trim().escape(),
  body('password').isLength({ min: 3 }),
];
