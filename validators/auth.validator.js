const { body } = require('express-validator');

exports.AuthValidator = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 3 }),
];
