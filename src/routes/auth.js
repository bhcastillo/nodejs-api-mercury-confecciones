const User = require('../models/auth');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  //try {
  //receiving Data
  const {username, email, password} = req.body;
  if (!password)
    res
      .status(500)
      .json({error: 'User validation failed:Password: password is requerid'});
  // creating a new User
  const user = new User({
    username,
    email,
    password,
  });
  user.password = await user.encryptPassword(password);

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
        res.status(200).json({id, username, email, token});
      } else {
        res.status(404).send({
          message: `No existen datos en el API con tus parámetros de búsqueda.`,
        });
      }
    }
  });

  // } catch (error) {
  //   res.status(500).json({
  //     message: 'there was a problem registering your user',
  //     error: error.message,
  //   });
  // }
};

const signIn = async (req, res) => {};
module.exports = {
  signUp,
  signIn,
};
