const Joi = require('@hapi/joi');

const signInValidation = (data) => {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return userSchema.validate(data);
};
const signUpValidation = (data) => {};

const errorMessage = (req, res, error) => {
  let messageError = error.message.slice(error.details[0].context.key.length + 2);

  return res.status(400).json({error: `${error.details[0].context.key}${messageError}`});
};
module.exports = {
  signInValidation,
  signUpValidation,
  errorMessage,
};
