import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as userService from "@/services/user.service";

export const getUsers = async () => {
  await connectDB();
  const users = await userService.getAllUsers();
  return NextResponse.json(users);
};

export const createUser = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  if (!data.phone) return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  if (await userService.findUserByEmail(data.email)) return NextResponse.json({ error: "User already exists" }, { status: 409 });
  const user = await userService.createUser(data);
  return NextResponse.json({message:"User created successfully", user}, { status: 201 });
};

export const getUserById = async (id: string) => {
  await connectDB();
  const user = await userService.getUserById(id);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({user, message: "User fetched successfully"});
};

export const getUsersWithPagination = async (page: number, limit: number, search: string, role?: string) => {
  await connectDB();
  const result = await userService.getUsersWithPagination(page, limit, search, role);
  return NextResponse.json(result);
};

export const updateUserStatus = async (id: string, isActive: boolean) => {
  await connectDB();
  const user = await userService.updateUserStatus(id, isActive);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({user, message: "User status updated successfully"});
};
