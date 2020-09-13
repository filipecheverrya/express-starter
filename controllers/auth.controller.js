const jwt = require('jsonwebtoken');

exports.createToken = (param) => {
  return jwt.sign(
    param,
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );
}

exports.verifyToken = (param) => {
  return jwt.verify(param, process.env.JWT_SECRET);
}