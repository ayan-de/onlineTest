const TestPaper = require("../models/testPaper");
const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const WhereClause = require("../utils/whereClasuse");
const user = require("../models/user");

exports.addQuestion = BigPromise(async (req, res, next) => {
  const { question, options, answer } =
    req.body;

  if (
    !question ||
    !options ||
    !answer
  ) {
    return next(new CustomError("All fields are required", 400));
  }

  req.body.user = req.user.id;

  const testpaper = await TestPaper.create(req.body);

  res.status(200).json({
    success: true,
    testpaper,
    message: "question successfully uploaded",
  });
});

exports.getAllQuestion = BigPromise(async (req, res, next) => {
  let resultperPage = 1;
  let totalcountQuestion = await TestPaper.countDocuments();

  let questionObj = new WhereClause(TestPaper.find(), req.query)
    .search()
    .filter();

  let question = await questionObj.base;
  let filterQuestionNumber = question.length;

  questionObj.pager(resultperPage);
  question = await questionObj.base.clone();

  res.status(200).json({
    success: true,
    question,
    filterQuestionNumber,
    totalcountQuestion,
  });
});

exports.getResult = BigPromise(async (req, res, next) => {
  const { answers } = req.body;

  let totalcountQuestion = await TestPaper.countDocuments();
  let marks = 0;
  // const attempted = 0;
  // const notAttempted = 0;
  // const correctAnswer = 0;
  // const incorrectAnswer = 0;

  for (let index = 0; index < totalcountQuestion; index++) {

    let userAnswer = answers[index];
    // Query for the document containing the correct answer
    let correctAnswerDoc = await TestPaper.findOne({
      QuestionNumber: index+1,
    });

    // Compare the user's answer with the correct answer
    if (userAnswer === correctAnswerDoc.answer) {
      marks = marks+1;
    }
  }
  req.body.user = req.user.id;
  let id = req.body.user;
  // console.log( id);

  await User.findByIdAndUpdate({_id:id},{
    $set : {
      result : marks
    },
  })

  res.status(200).json({
    success: true,
    marks,
  });
});

exports.adminGetAllQuestion = BigPromise(async (req, res, next) => {
  const testPaper = await TestPaper.find({});

  res.status(200).json({
    success: true,
    testPaper,
  });
});
