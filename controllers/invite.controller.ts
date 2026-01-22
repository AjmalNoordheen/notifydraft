import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as inviteService from "@/services/invite.service";

export const createInviteLink = async (adminId: string, req: NextRequest) => {
  await connectDB();
  const invite = await inviteService.createInviteLink(adminId);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const inviteUrl = `${baseUrl}/register?token=${invite.token}`;
  return NextResponse.json({ inviteUrl, expiresAt: invite.expiresAt }, { status: 201 });
};

export const validateInvite = async (token: string) => {
  await connectDB();
  const invite = await inviteService.validateInviteToken(token);
  if (!invite) {
    return NextResponse.json({ error: "Invalid or expired invite link" }, { status: 400 });
  }
  return NextResponse.json({ valid: true });
};
