// app/api/seed/route.ts
import { connectDB } from "@/lib/db";
import { User } from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET() {
  await connectDB();

  if(!process.env.ADMIN_SIGNUP_EMAIL || !process.env.ADMIN_SIGNUP_PASSWORD){
    return NextResponse.json({message: "Admin email or password not set in environment variables"}, {status: 500});
  }

  const hashed = await bcrypt.hash(process.env.ADMIN_SIGNUP_PASSWORD, 10);
  const user =await User.findOne({ email: process.env.ADMIN_SIGNUP_EMAIL });
  if (user) {
    return NextResponse.json({ message: "User already exists" });
  }
  await User.create({
    email: process.env.ADMIN_SIGNUP_EMAIL,
    password: hashed,
    centerName: "Main Center",
    userRole: "super_admin",
    phone: "0000000000",
  });

  return NextResponse.json({ message: "User created" });
}
