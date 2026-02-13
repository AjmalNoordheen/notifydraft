import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function authenticateRequest(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] || req.cookies.get("auth_token")?.value;

  if (!token) {
    return { authenticated: false, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const decoded: any = verifyToken(token);
    return { authenticated: true, user: decoded };
  } catch {
    return { authenticated: false, error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}

export function authSuperAdmin(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] || req.cookies.get("auth_token")?.value;

  if (!token) {
    return { authenticated: false, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const decoded : any = verifyToken(token);
    if(decoded?.role !== 'super_admin') {
      return { authenticated: false, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
    }
    return { authenticated: true, user: decoded };
  } catch {
    return { authenticated: false, error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}


export function authAdmin(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1] || req.cookies.get("auth_token")?.value;

  if (!token) {
    return { authenticated: false, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  try {
    const decoded : any = verifyToken(token);
    if(decoded?.role === 'user') {
      return { authenticated: false, error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
    }
    return { authenticated: true, user: decoded };
  } catch {
    return { authenticated: false, error: NextResponse.json({ error: "Invalid token" }, { status: 401 }) };
  }
}
