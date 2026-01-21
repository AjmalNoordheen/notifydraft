import { NextRequest, NextResponse } from "next/server";
import { authSuperAdmin } from "@/lib/auth";
import * as userController from "@/controllers/user.controller";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;

  const { id } = await params;
  const { isActive } = await req.json();
  if (typeof isActive !== "boolean") {
    return NextResponse.json({ error: "isActive must be a boolean" }, { status: 400 });
  }

  return userController.updateUserStatus(id, isActive);
}
