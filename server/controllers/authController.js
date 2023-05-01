import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res, next) => {
  const { name, lastname, email, password } = req.body;

  if (!name) {
    next("name is required");
  }

  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and greater than 6 character");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("User already registered with this email address");
  }
  // const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    lastname,
    email,
    password,
  });
  return res.status(200).send({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
};
