import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  creditAmount: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
