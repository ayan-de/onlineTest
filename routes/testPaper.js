const express = require("express");
const router = express.Router();

const {
    addQuestion,
    getAllQuestion
} = require("../controllers/testpaperController");

const { isLoggedIn, customRole } = require("../middlewares/user");

//admin route
router.route("/addQuestion").post(isLoggedIn, customRole("admin"),addQuestion);
router.route("/getAllQuestion").get(isLoggedIn,getAllQuestion);


module.exports = router;
