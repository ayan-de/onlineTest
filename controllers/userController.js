const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const cookieToken = require("../utils/cookieToken");
const cloudinary = require("cloudinary");
// const mailHelper = require('../utils/emailHelper')
const crypto = require("crypto");
const { log } = require("console");

exports.signup = BigPromise(async (req, res, next) => {

  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new CustomError("Name, email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res, "Registered Successfully");
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  //check for email and password
  if (!email || !password) {
    return next(new CustomError("please provide email and password", 400));
  }
  // get user from DB
  const user = await User.findOne({ email }).select("+password");

  //if user not found in db
  if (!user) {
    return next(
      new CustomError("email or password does not match or exist", 400)
    );
  }
  //match the password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  //if password do not match
  if (!isPasswordCorrect) {
    return next(
      new CustomError("email or password does not match or exist", 400)
    );
  }

  //if all goes good send the token
  cookieToken(user, res, `Welcome, ${user.name}`);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});
