import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Types } from "mongoose";

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const exists = await User.findOne({ email: data.email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return {
    user,
    token: generateToken(user._id, user.role),
  };
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: data.email });
  if (!user) throw new Error("user not found!");

  const passwordMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordMatch) throw new Error("Invalid email or password");

  return {
    user,
    token: generateToken(user._id, user.role),
  };
};

const generateToken = (id: Types.ObjectId, role: string) => {
  return jwt.sign({ id, role }, env.JWT_SECRET, { expiresIn: "7d" });
};
