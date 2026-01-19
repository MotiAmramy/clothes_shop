import { User } from "../models/user.model";

export const getUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUserById = async (
  _id: string,
  data: Partial<{ name: string; email: string; password: string, role: "admin" | "user" }>
) => {
  console.log(_id);
  console.log(data);

  return await User.findByIdAndUpdate(_id, data, { new: true });
};

export const deleteUser = async (_id: string) => {
  return await User.findByIdAndDelete(_id);
};
