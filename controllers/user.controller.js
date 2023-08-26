const User = require("../models/user.model");
const logger = require("../logger/logger");

exports.findAll = function (req, res) {
  console.log("Find all users");
  User.find({}, (err, results) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Error in reading all users", err);
      logger.error("Error in reading all users", err);
    } else {
      res.status(200).json({ status: true, data: results });
      console.log("Success in reading users");
      logger.info("Success in reading all users", results);
      logger.warn("Warn in reading all users");
      logger.debug("Debug in reading all users");
    }
  });
};

exports.findOne = function (req, res) {
  const username = req.params.username;
  console.log("Find  user with username", username);

  User.findOne({ username: username }, (err, results) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log(`Error in finding user: ${username}`, err);
    } else {
      if (results) {
        res.status(200).json(results);
        console.log(`Success in reading user: ${username}`);
      } else {
        res.status(404).json("not found");
      }
    }
  });
};

exports.create = function (req, res) {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products,
  });

  for (const phoneNumber of newUser.phone) {
    if (isNaN(Number(phoneNumber.number))) {
      return res.status(400).json({
        status: false,
        data: "Please provide valid numbers for phone",
      });
    }
  }

  console.log("Insert user with username:", req.body.username);

  newUser.save((err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("problem in creating user");
    } else {
      res.status(200).json({ status: true, data: result });
      console.log(`User saved with username: ${req.body.username}`);
    }
  });
};

exports.update = function (req, res) {
  const username = req.body.username;

  const updateUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
  };

  User.findOneAndUpdate(
    { username: username },
    updateUser,
    { new: true },
    (err, result) => {
      if (err) {
        res.status(400).json({ status: false, data: err });
        console.log("Problem in updating user");
      } else {
        res.status(200).json({ status: true, data: result });
        console.log("Success in updating user");
      }
    }
  );

  console.log("Update user with username:", req.body.username);
};

exports.delete = function (req, res) {
  const username = req.params.username;

  console.log("Delete user with username", username);

  User.findOneAndDelete({ username: username }, (err, result) => {
    if (err) {
      res.status(400).json({ status: false, data: err });
      console.log("Problem in deleting user");
    } else {
      res
        .status(200)
        .json({ status: true, data: result ? result : "user not found" });
      console.log("Success in deleting user");
    }
  });
};
