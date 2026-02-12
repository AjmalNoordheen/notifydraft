import { NextRequest } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import * as documentController from "@/controllers/document.controller";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return documentController.getDocumentById(params.id);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return documentController.updateDocument(params.id, req);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;
  return documentController.deleteDocument(params.id);
}
