import { NextRequest } from "next/server";
import * as inviteController from "@/controllers/invite.controller";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) {
    return new Response(JSON.stringify({ error: "Token is required" }), { status: 400 });
  }
  return inviteController.validateInvite(token);
}
