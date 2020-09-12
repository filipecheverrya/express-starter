const jwt = require('jsonwebtoken');

exports.createToken = (param) => {
  return jwt.sign(
    param,
    process.env.JWT_SECRET,
    { expiresIn: 300 }
  );
}

exports.verifyToken = (param) => {
  return jwt.verify(param, process.env.JWT_SECRET);
}