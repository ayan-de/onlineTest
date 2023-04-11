require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middlewares/Error')

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    "success":"true",
    "message":"This route will contain TEST RESULT LOGIN/SIGNUP button"
  });
});

//morgan middleware
app.use(morgan("tiny"));

//import all routes here
const user = require("./routes/user");
const testPaper = require("./routes/testPaper");

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", testPaper);


app.use(errorMiddleware)

//export app js
module.exports = app;