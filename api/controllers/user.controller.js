import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uuid from "react-uuid";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import crypto from "crypto";

export const signIn = async (req, res) => {
  const { userID, password } = req.body;

  try {
    if (userID === null || typeof userID == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: "Email Field Required" });
    if (password === null || typeof password == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: "Password Field Required" });

    const existingUser = await User.findOne({ userID: userID });
    if (!existingUser)
      return res
        .status(404)
        .json({ code: "02", message: "User doesn't exist" });

    if (existingUser.status == 1) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ code: "02", message: "Invalid Credentials" });

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        "test",
        { expiresIn: "1h" }
      );

      res.status(200).json({ code: "01", result: existingUser, token });
    } else {
      return res
        .status(400)
        .json({ code: "02", message: "Account is not activated" });
    }
  } catch (error) {
    res.status(500).json({ code: "00", message: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { userID, email, password, type, name, mobileNo } = req.body;

  try {
    if (email === null || typeof email == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: "Email Field Required" });
    if (userID === null || typeof userID == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: "UserID Field Required" });
    if (name === null || typeof name == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: " Name Field Required" });
    if (mobileNo === null || typeof mobileNo == "undefined")
      return res
        .status(400)
        .json({ code: "02", message: "User Contact Number Field Required" });

    const existingUser = await User.findOne({ userID: userID });
    if (existingUser)
      return res
        .status(400)
        .json({ code: "02", message: "User already exist" });

    const hashPassword = await bcrypt.hash(password, 12);

    let otp = generateOTP();

    // initial credit amount to the user is 1000
    const userDetails = new User({
      userID: userID,
      email: email,
      password: hashPassword,
      type: "passenger",
      mobileNo: mobileNo,
      creditAmount: 1000,
      otp: otp,
      name: name,
    });

    const userResult = await userDetails.save();

    mailService(email, otp);

    const token = jwt.sign(
      { email: userResult.email, id: userResult._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ code: "01", result: userResult, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: "00", message: "Something went wrong" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200);
    res.json(users);
  } catch (error) {
    console.log(error);

    res.status(404);
    res.json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    res.status(200);
    res.json({
      code: "01",
      result: user,
    });
  } catch (error) {
    res.status(404);
    res.json({ message: error.message });
  }
};

export const checkOTP = async (req, res) => {
  const { userID, otp } = req.body;

  const existingUser = await User.findOne({ userID: userID });

  if (!existingUser)
    return res.status(404).json({ code: "02", message: "User doesn't exist" });

  if (existingUser.otp == otp) {
    let id = existingUser._id;
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    await User.updateOne(
      { userID: userID },
      {
        $set: {
          status: "1",
        },
      }
    );
    res.status(200).json({ code: "01", result: existingUser, token });
  } else {
    return res.status(400).json({ code: "02", message: "Invalid OTP" });
  }
};

// mail service
function mailService(email, password) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  let mailOptions = {
    from: "no-reply@accounts.ticketnow.com",
    to: email,
    subject: "Please activate your account",
    text: `Use this OTP - ${password} to activate your account`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
