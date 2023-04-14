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
  options:[
    {
      type:String,
      required:true,
    },
  ],
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
