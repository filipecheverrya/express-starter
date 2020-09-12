const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');

const { signIn, findByEmail } = require('../controllers/users.controller');
const { AuthValidator } = require('../validators/auth.validator');
const { createToken } = require('../controllers/auth.controller');

/* 
  * POST /login
*/
router.post('/', AuthValidator, async function(req, res, next) {
  const errors = validationResult(req);
  const { email } = req.body;
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userData = await findByEmail(email);

  if (userData) {
    const { authorized, user } = await signIn(req.body);
    return res.status(200).send({
      message: 'You are authorized',
      token: createToken({ id: userData._id }),
    });
  }
  
  return res.status(500).send({ message: 'User doesnt exists' });
});

module.exports = router;
