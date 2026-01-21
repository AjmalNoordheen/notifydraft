import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import * as userController from "@/controllers/user.controller";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return userController.getUserById(id);
}
