const jwt = require('jsonwebtoken');

exports.isAuthorized = async (req, res, next) => {
  try {
    const [, token] = req.headers['authorization'].split(' ');
    const authorized = jwt.verify(token, process.env.JWT_SECRET);
    console.log(authorized);
  
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}