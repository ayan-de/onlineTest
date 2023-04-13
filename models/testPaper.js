const mongoose = require("mongoose");

const testpaperSchema = new mongoose.Schema({
  QuestionNumber: {
    type: Number,
    required: [true, "please provide the question number"],
  },
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
  answer: {
    type: Number,
    required: [true, "please provide the answer for the above question"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TestPaper", testpaperSchema);
