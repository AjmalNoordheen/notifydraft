import { Document } from "@/models/Document";
import "@/models/User";

export const createDocument = async (data: any) => {
  return await Document.create(data);
};

export const getAllDocuments = async (page = 1, limit = 10, search = "", userId?: string) => {
  const skip = (page - 1) * limit;
  const query: any = {};
  if (userId) query.userId = userId;
  if (search) query.$or = [{ filePath: { $regex: search, $options: "i" } }];
  
  const [data, total] = await Promise.all([
    Document.find(query).populate("userId", '-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    Document.countDocuments(query)
  ]);
  return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
};

export const getDocumentById = async (id: string) => {
  return await Document.findById(id).populate("userId");
};

export const updateDocument = async (id: string, data: any) => {
  return await Document.findByIdAndUpdate(id, data, { new: true }).populate("userId");
};

export const deleteDocument = async (id: string) => {
  return await Document.findByIdAndDelete(id);
};
