const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const {required} = require('@hapi/joi');
const {signInValidation, signUpValidation, errorMessage} = require('../libs/joi');

const signUp = async (req, res) => {
  //validate data
  const {error} = signUpValidation(req.body);
  if (error) {
    return errorMessage(req, res, error);
  }
  //receiving Data
  const {username, email, password} = req.body;
  // creating a new User
  const user = new User({
    username,
    email,
    password,
  });
  user.password = await user.encryptPassword(password);
  // saving a new user
  await user.save((err, data) => {
    if (err) {
      res.status(500).send({
        error: err.message,
      });
    } else {
      if (data) {
        // create a Token
        const {id, username, email} = data;
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET, {
          expiresIn: 60 * 60 * 24,
        });
        res.status(201).json({id, username, email, token});
      } else {
        res.status(404).send({
          message: `No existen datos en el API con tus parámetros de búsqueda.`,
        });
      }
    }
  });
};

const signIn = async (req, res) => {
  //validate data
  const {error} = signInValidation(req.body);
  if (error) {
    return errorMessage(req, res, error);
  }
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user) return res.status(404).json({error: "The email doesn't exists"});
  const validPassword = await user.comparePassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({error: 'Invalid password'});
  }
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
  res.header('x-access-token', token).json({token});
};
module.exports = {
  signUp,
  signIn,
};
