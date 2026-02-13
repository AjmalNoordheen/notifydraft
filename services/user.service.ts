import { User } from "@/models/User";
import { hashPassword } from "@/lib/bcrypt";
import mongoose, { mongo } from "mongoose";

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
  const result = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "documents",
        localField: "_id",
        foreignField: "userId",
        as: "documents"
      }
    },
    { $project: { password: 0 } }
  ]);
  return result[0] || null;
};

export const getUsersWithPagination = async (page: number, limit: number, search: string, role?: string, adminId?: string) => {
  const matchQuery: any = {};
  if (search) matchQuery.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }, { phone: new RegExp(search, 'i') }];
  if (role) matchQuery.userRole = role;
  if (adminId) matchQuery.adminId = new mongoose.Types.ObjectId(adminId);

  const [result] = await User.aggregate([
    { $match: matchQuery },
    {
      $facet: {
        users: [
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $lookup: {
              from: "documents",
              localField: "_id",
              foreignField: "userId",
              as: "documents"
            }
          },
          { $project: { password: 0 } }
        ],
        total: [{ $count: "count" }]
      }
    }
  ]);

  const total = result.total[0]?.count || 0;
  return { users: result.users, total, page, totalPages: Math.ceil(total / limit) };
};

export const updateUserStatus = async (id: string, isActive: boolean) => {
  return await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
};
