const TestPaper = require("../models/testPaper");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");


exports.createquestion = BigPromise(async (req, res, next) => {
  const { question, optionOne, optionTwo, optionThree,optionFour } = req.body;

  if (!question || !optionOne || !optionTwo || !optionThree || !optionFour) {
    return next(new CustomError("All fields are required", 400));
  }

  // req.body.user = req.user._id;

  const testpaper = await TestPaper.create({
    question,
    optionOne,
    optionTwo,
    optionThree,
    optionFour
  });

  res.status(200).json({
    success: true,
    testpaper,
    message: "question successfully uploaded",
  });
});
