import { NextRequest } from "next/server";
import { authSuperAdmin } from "@/lib/auth";
import * as userController from "@/controllers/user.controller";

export async function GET(req: NextRequest) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || undefined;

  return userController.getUsersWithPagination(page, limit, search, role);
}

export async function POST(req: NextRequest) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  return userController.createUser(req);
}
