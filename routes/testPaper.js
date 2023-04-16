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
router.route("/addQuestion").post(addQuestion);
router.route("/adminGetAllQuestion").get(adminGetAllQuestion);

//user route
router.route("/getAllQuestion").get(isLoggedIn,getAllQuestion);
router.route("/getResult").post(isLoggedIn,getResult);


module.exports = router;
