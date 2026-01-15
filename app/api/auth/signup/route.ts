import { connectDB } from "@/lib/db";
import { User } from "@/model/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password, centerName, secret_key } = await req.json();

    if (!email || !password || !centerName || !secret_key) {
      return NextResponse.json(
        { message: "Email, password, center name and secret key are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user Already exists" },
        { status: 409 }
      );
    }

    if (secret_key !== process.env.ADMIN_SIGNUP_SECRET) {
      return NextResponse.json(
        { message: "Invalid Secret Key" },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      centerName,
    });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    const response = NextResponse.json({
      message: "Account created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        centerName: newUser.centerName,
      },
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
