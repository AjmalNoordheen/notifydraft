import { connectDB } from "@/lib/db";
import { findUserByEmail, createUser } from "@/services/user.service";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

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

    const user = await findUserByEmail(email);

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

    const newUser = await createUser({ email, password, centerName });

    const token = signToken({ userId: newUser._id, email: newUser.email, role: newUser.userRole });

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
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
}
