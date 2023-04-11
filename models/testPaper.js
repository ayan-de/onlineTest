const mongoose = require("mongoose");

const testpaperSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "please provide the question"],
  },
  optionOne: {
    type: String,
    required: [true, "please provide the option"],
  },
  optionTwo: {
    type: String,
    required: [true, "please provide the option"],
  },
  optionThree: {
    type: String,
    required: [true, "please provide the option"],
  },
  optionFour: {
    type: String,
    required: [true, "please provide the option"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("TestPaper", testpaperSchema);
