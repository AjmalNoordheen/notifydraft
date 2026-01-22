import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as userService from "@/services/user.service";
import * as inviteService from "@/services/invite.service";

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  
  if (!data.token) {
    return NextResponse.json({ error: "Invite token is required" }, { status: 400 });
  }

  const invite = await inviteService.validateInviteToken(data.token);
  if (!invite) {
    return NextResponse.json({ error: "Invalid or expired invite link" }, { status: 400 });
  }

  if (!data.phone) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }

  if (await userService.findUserByEmail(data.email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const user = await userService.createUser({ ...data, invitedBy: invite.createdBy });
  await inviteService.markInviteAsUsed(data.token);

  return NextResponse.json({ message: "User registered successfully", user }, { status: 201 });
}
