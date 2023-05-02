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

  let user = await userModel.create({
    name,
    lastname,
    email,
    password,
  });
  const token = user.createJWT();
  return res.status(200).send({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastname: user.lastname,
      location: user.location,
      email: user.email,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required");
  }

  const userExist = await userModel.findOne({ email }).select("+password");
  if (!userExist) {
    next("user is not registered! please create a account ");
  }
  const isMatch = userExist.comparePassword(password);
  if (!isMatch) {
    next("password is incorrect");
  }

  const token = userExist.createJWT();
  userExist.password = undefined;
  return res.status(200).send({
    success: true,
    message: "user login successfully",
    user: userExist,
    token,
  });
};
