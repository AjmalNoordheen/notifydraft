import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as staffService from "@/services/staff.service";

export const getStaff = async () => {
  await connectDB();
  const staff = await staffService.getAllStaff();
  return NextResponse.json(staff);
};

export const createStaff = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  const staff = await staffService.createStaff(data);
  return NextResponse.json(staff, { status: 201 });
};

export const updateStaff = async (req: NextRequest, id: string) => {
  await connectDB();
  const data = await req.json();
  const staff = await staffService.updateStaff(id, data);
  return NextResponse.json(staff);
};

export const deleteStaff = async (id: string) => {
  await connectDB();
  await staffService.deleteStaff(id);
  return NextResponse.json({ message: "Staff deleted" });
};
