import { User } from "../models/user.model";

export const getUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUser = async (
  id: string,
  data: Partial<{ name: string; email: string; password: string }>
) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
