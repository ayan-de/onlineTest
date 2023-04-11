const express = require("express");
const router = express.Router();

const {
    createquestion
} = require("../controllers/testpaperController");

// const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/createquestion").post(createquestion);

module.exports = router;
