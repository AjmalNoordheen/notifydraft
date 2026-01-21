import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import * as userController from "@/controllers/user.controller";

export async function GET(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return userController.getUsers();
}

export async function POST(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return userController.createUser(req);
}
