import { User } from "@/models/User";
import { hashPassword } from "@/lib/bcrypt";

export const createUser = async (data: any) => {
  const hashedPassword = await hashPassword(data.password);
  return await User.create({ ...data, password: hashedPassword });
};

export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const getUserById = async (id: string) => {
  return await User.findById(id).select("-password");
};

export const getUsersWithPagination = async (page: number, limit: number, search: string, role?: string) => {
  const query: any = search ? { $or: [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { phone: new RegExp(search, 'i') }] } : {};
  if (role) query.userRole = role;
  const users = await User.find(query).select("-password").skip((page - 1) * limit).limit(limit);
  const total = await User.countDocuments(query);
  return { users, total, page, totalPages: Math.ceil(total / limit) };
};

export const updateUserStatus = async (id: string, isActive: boolean) => {
  return await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
};
