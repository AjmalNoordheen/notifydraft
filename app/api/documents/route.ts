import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import * as documentController from "@/controllers/document.controller";

export async function POST(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return documentController.createDocument(auth.user.id, req);
}

export async function GET(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return documentController.getAllDocuments(req);
}
