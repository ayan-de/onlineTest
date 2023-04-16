const express = require("express");
const router = express.Router();

const {
    addQuestion,
    getAllQuestion,
    adminGetAllQuestion,
    getResult
} = require("../controllers/testpaperController");

const { isLoggedIn, customRole } = require("../middlewares/user");

//admin route
router.route("/addQuestion").post(isLoggedIn,customRole('admin'),addQuestion);
router.route("/adminGetAllQuestion").get(isLoggedIn,customRole('admin'),adminGetAllQuestion);

//user route
router.route("/getAllQuestion").get(getAllQuestion);
router.route("/getResult").post(getResult);


module.exports = router;
