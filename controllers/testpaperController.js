const TestPaper = require("../models/testPaper");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const WhereClause = require("../utils/whereClasuse");

exports.addQuestion = BigPromise(async (req, res, next) => {
  const { question, optionOne, optionTwo, optionThree, optionFour, answer } = req.body;

  // let answerArray = [];

  // if(!req.answers){
  //   return next(new CustomError(`Please provide answers for all questons`, 401));
  // }

  // if(req.answers){
  //   for (let index = 0; index < req.answers.length; index++) {
  //     answerArray.push(req.answers)
      
  //   }
  // }

  if (!question || !optionOne || !optionTwo || !optionThree || !optionFour || !answer) {
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

exports.getResult = BigPromise(async (req, res, next)  => {
  
})