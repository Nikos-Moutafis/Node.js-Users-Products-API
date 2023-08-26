const Product = require("../models/products.model");

exports.findAll = function (req, res) {
  Product.find({}, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
};

exports.findOne = function (req, res) {
  const product = req.params.product;
  Product.find({ product: product }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
};

exports.create = function (req, res) {
  const newProduct = new Product({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  });

  newProduct.save((err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
};

exports.update = function (req, res) {
  let product = req.body.product;

  console.log(req.body.cost);
  let productToUpdate = {
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity,
  };

  Product.findOneAndUpdate(
    { product: product },
    productToUpdate,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ status: false, data: err });
      } else {
        res.status(200).json({ status: true, data: result });
      }
    }
  );
};

exports.delete = function (req, res) {
  const productToDelete = req.params.product;

  Product.findOneAndDelete({ product: productToDelete }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
    } else {
      res.status(200).json({ status: true, data: result });
    }
  });
};
