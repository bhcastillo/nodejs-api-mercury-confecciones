const {required} = require('@hapi/joi');

const jwt = require('jsonwebtoken');

const TokenValidation = async (req, res, next) => {
  try {
    const token = req.header('x-access-token');

    if (!token) return res.status(401).json({error: 'No token Provided'});
    const payload = await jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = payload._id;
    next();
  } catch (err) {
    res.status(400).json({error: 'Invalid token'});
  }
};
module.exports = TokenValidation;
