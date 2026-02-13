import { NextRequest } from "next/server";
import { authAdmin } from "@/lib/auth";
import * as documentController from "@/controllers/document.controller";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentController.getDocumentById(id);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentController.updateDocument(id, req);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = authAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentController.deleteDocument(id);
}
