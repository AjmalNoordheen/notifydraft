import { NextRequest } from "next/server";
import { authAdmin } from "@/lib/auth";
import * as userController from "@/controllers/user.controller";

export async function GET(req: NextRequest) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const role = searchParams.get("role") || undefined;
  const adminId = auth.user.userId;
  console.log(adminId, 'adminId');
  
  return userController.getUsersWithPagination(page, limit, search, role, adminId);
}
