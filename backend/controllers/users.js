const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.registerUser = (req, res, next) => {
  bcrypt.hash(req.body.userPass, 17).then(hash => {
    const user = new User({
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPass: hash
    });
    user
      .save()
      .then(result => {
        return res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials on register!"
        });
      });
  });
}

exports.loginUser = (req, res, next) => {
  let fetchedUser;
  User.findOne({ userEmail: req.body.userEmail })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Email not found"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.userPass, user.userPass);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Wrong pass"
        });
      }
      const token = jwt.sign(
        { userEmail: fetchedUser.userEmail, userId: fetchedUser._id, userName: fetchedUser.userName },
        "its_a_secret_dont_tell_anyone",
        { expiresIn: "3h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 10800,
        userId: fetchedUser._id,
        userName: fetchedUser.userName,
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials on login!"
      });
    });
}
