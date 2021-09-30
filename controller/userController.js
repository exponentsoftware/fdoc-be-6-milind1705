const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = (req, res) => {
  const { username, email, mobile, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json("All the fields are mandetory");
  }
  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json("email already exist");
    }
    //hash password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        //save the user
        const newUser = new User({
          username: username,
          email: email,
          mobile: mobile,
          password: hash,
        });
        newUser
          .save()
          .then((data) => {
            return res.status(200).json({
              data: {
                username: data.username,
                email: data.email,
                mobile: data.mobile,
              },
              error: null,
              message: "User saved successfully",
            });
          })
          .catch((err) => {
            return res.status(400).json({
              data: null,
              error: err,
              message: "something went wrong while creating and user",
            });
          });
      });
    });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All the fields are mandetory");
  }
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(400).json("User does not exist");
    }
    //compare the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json("Incorrect Password");
      }

      //jwt authantication
      jwt.sign(
        { _id: user.id },
        process.env.SECRETE,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.cookie("jwt1", token, {
            expires:new Date(Date.now() + 60*60*60*10)
        })
          return res.status(200).json({
            data: { username: user.username, email: user.email, id: user.id },
            token: token,
            error: null,
          });
        }
      );
    });
  });
};

// get users
module.exports.getAllUser = (req, res) => {
  User.find()
    .then((user) => {
      return res.status(200).json({
        data: user,
        error: null,
        message: "data fetch successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data: null,
        error: err,
        message: "Canot fetch all data",
      });
    });
};

module.exports.getUserById = (req, res) => {
  User.find({ _id: req.params.id })
    .populate("todo")
    .then((user) => {
      return res.status(200).json({
        data: user,
        error: null,
        message: "data fetch successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        data: null,
        error: err,
        message: "Canot fetch all data",
      });
    });
};
