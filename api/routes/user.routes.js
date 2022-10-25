import express from "express";
import {
  getUser,
  getUsers,
  signIn,
  signUp,
  checkOTP,
  addCredit,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);
router.get("/all", getUsers);
router.get("/:id", getUser);
router.post("/check-otp", checkOTP);
router.post("/add-credit", addCredit);

export default router;
