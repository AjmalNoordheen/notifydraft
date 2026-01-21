import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as documentTypeService from "@/services/documentType.service";

export const createDocumentType = async (req: NextRequest) => {
  await connectDB();
  const data = await req.json();
  const existingDocumentType = await documentTypeService.getDocumentTypeByName(data.name);
  if (existingDocumentType) {
    return NextResponse.json({ error: "Document type with this name already exists" }, { status: 400 });
  }
  const documentType = await documentTypeService.createDocumentType(data);
  return NextResponse.json(documentType, { status: 201 });
};

export const getAllDocumentTypes = async (req: NextRequest) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const result = await documentTypeService.getAllDocumentTypes(page, limit, search);
  return NextResponse.json(result);
};

export const getDocumentTypeById = async (id: string) => {
  await connectDB();
  const documentType = await documentTypeService.getDocumentTypeById(id);
  if (!documentType) {
    return NextResponse.json({ error: "Document type not found" }, { status: 404 });
  }
  return NextResponse.json(documentType);
};

export const updateDocumentType = async (id: string, req: NextRequest) => {
try {
  await connectDB();
  const data = await req.json();
  const documentType = await documentTypeService.updateDocumentType(id, data);
  if (!documentType) {
    return NextResponse.json({ error: "Document type not found" }, { status: 404 });
  }
  return NextResponse.json({  documentType, message: "Document type updated successfully" });
} catch (error: any) {
   return NextResponse.json({ error: error?.message || "An error occurred" }, { status: 400 }); 
} 
};

export const deleteDocumentType = async (id: string) => {
  await connectDB();
  const documentType = await documentTypeService.deleteDocumentType(id);
  if (!documentType) {
    return NextResponse.json({ error: "Document type not found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Document type deleted successfully" });
};
