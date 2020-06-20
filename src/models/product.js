const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ProductSchema = new Schema({
    _id: {
      type: String,
      required: [true, 'el Id es requerido'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'una descripción es requerida'],
    },
    title: {
      type: String,
      required: [true, 'un titulo es requerido'],
    },
    color: {
      type: String,
      required: [true, 'un color es requerido'],
    },
    url: {
      type: String,
      required: [true, 'un nombre de imagen es requerido *** no añada su extensión'],
    },
    buttonsPalette: {
      type: String,
    },
  });

module.exports = mongoose.model('Product', ProductSchema);
