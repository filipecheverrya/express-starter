const jwt = require('jsonwebtoken');

exports.isAuthorized = async (req, res, next) => {
  try {
    const [, token] = req.headers['authorization'].split(' ');
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    
    req.body.id = id;
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}