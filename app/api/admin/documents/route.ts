import { NextRequest } from "next/server";
import { authAdmin } from "@/lib/auth";
import * as documentController from "@/controllers/document.controller";

export async function POST(req: NextRequest) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  return documentController.createDocumentForUser(auth.user.id, req);
}

export async function GET(req: NextRequest) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  return documentController.getAllDocuments(req);
}
