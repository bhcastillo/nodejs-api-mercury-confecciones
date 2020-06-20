const Product = require('../models/product');
const apiResponse = require('../libs/apiResponse');
const getProducts = async (req, res) => {
  await Product.find({})
    .sort({id: 1})
    .exec((err, data) => {
      apiResponse(req, res, err, data);
    });
};
const getProduct = async (req, res) => {
  await Product.findById(req.params._id).exec((err, data) =>
    apiResponse(req, res, err, data)
  );
};
const postProduct = async (req, res) => {
  let product = new Product(req.body);
  await product.save((err, data) => {
    apiResponse(req, res, err, data);
  });
};
const putProduct = async (req, res) => {
  await Product.findByIdAndUpdate(req.params._id, req.body, {new: true}, (err, data) => {
    apiResponse(req, res, err, data);
  });
};
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params._id, (err, data) => {
    apiResponse(req, res, err, data);
  });
};
const notFound = async (req, res) => {
  await res.status(404).send({err: {message: 'Not Found'}});
};
module.exports = {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  notFound,
};
