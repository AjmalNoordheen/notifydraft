import { NextRequest } from "next/server";
import { authAdmin } from "@/lib/auth";
import * as inviteController from "@/controllers/invite.controller";

export async function POST(req: NextRequest) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  
  return inviteController.createInviteLink(auth.user.userId, req);
}
