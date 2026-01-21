import { NextRequest } from "next/server";
import { authSuperAdmin } from "@/lib/auth";
import * as documentTypeController from "@/controllers/documentType.controller";

export async function GET(req: NextRequest) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  return documentTypeController.getAllDocumentTypes(req);
}

export async function POST(req: NextRequest) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  return documentTypeController.createDocumentType(req);
}
