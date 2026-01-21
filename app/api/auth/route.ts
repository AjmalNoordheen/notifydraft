import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { findUserByEmail } from "@/services/user.service";
import { comparePassword } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({ id: user._id, email: user.email, role: user.userRole });

    return NextResponse.json({ token, user: { email: user.email, role: user.userRole } });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
