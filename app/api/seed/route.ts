// app/api/seed/route.ts
import { connectDB } from "@/lib/db";
import { User } from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const hashed = await bcrypt.hash("SyntaxError123*", 10);

  await User.create({
    email: "noorudheenajmal@gmail.com",
    password: hashed,
  });

  return NextResponse.json({ message: "User created" });
}
