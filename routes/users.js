const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const { findByEmail, createUser } = require('../controllers/users.controller');
const { createToken } = require('../controllers/auth.controller');
const { UserValidator } = require('../validators/users.validator');

/*
  * POST /users
*/
router.post('/', UserValidator, async function(req, res, next) {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (await findByEmail(req.body.email)) {
    return res.status(409).send({ message: 'Email already exists' });
  }

  const newUser = await createUser(req.body);

  return res.status(200).send({
    message: 'User created succesfully',
    token: createToken({
      id: newUser.insertedId
    }),
  });
});

module.exports = router;
