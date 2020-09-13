const { body } = require('express-validator');

exports.postValidator = [
  body('text').notEmpty().isString().isLength({ max: 128 }),
  body('email').isEmail().normalizeEmail(),
];
