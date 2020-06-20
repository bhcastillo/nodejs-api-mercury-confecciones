const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is requerid'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email is requerid'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is requerid'],
  },
});

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = model('User', userSchema);
