import { NextRequest } from "next/server";
import { authSuperAdmin } from "@/lib/auth";
import * as documentTypeController from "@/controllers/documentType.controller";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentTypeController.getDocumentTypeById(id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentTypeController.updateDocumentType(id, req);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = authSuperAdmin(req);
  if (!auth.authenticated) return auth.error;
  const { id } = await params;
  return documentTypeController.deleteDocumentType(id);
}
