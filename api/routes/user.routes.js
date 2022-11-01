const express = require("express");
const {
  getUser,
  getUsers,
  signIn,
  signUp,
  checkOTP,
  addCredit,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.post("/check-otp", checkOTP);
router.post("/add-credit", addCredit);

module.exports = router;
