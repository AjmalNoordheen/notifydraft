import { Staff } from "@/models/Staff";

export const createStaff = async (data: any) => {
  return await Staff.create(data);
};

export const getAllStaff = async () => {
  return await Staff.find();
};

export const getStaffById = async (id: string) => {
  return await Staff.findById(id);
};

export const updateStaff = async (id: string, data: any) => {
  return await Staff.findByIdAndUpdate(id, data, { new: true });
};

export const deleteStaff = async (id: string) => {
  return await Staff.findByIdAndDelete(id);
};
