import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as documentService from "@/services/document.service";
import { uploadDocument, deleteFile } from "@/utils/cloudinary";

export const createDocument = async (userId: string, req: NextRequest) => {
  await connectDB();
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const documentType = formData.get("documentType") as string;
  const expireDate = formData.get("expireDate") as string;

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }
  if (!documentType) {
    return NextResponse.json({ error: "Document type is required" }, { status: 400 });
  }

  const uploadResult: any = await uploadDocument(file);
  const document = await documentService.createDocument({
    userId,
    documentType,
    expireDate: expireDate ? new Date(expireDate) : undefined,
    filePath: uploadResult.url,
    publicId: uploadResult.public_id,
  });

  return NextResponse.json({ message: "Document created successfully", document }, { status: 201 });
};

export const getAllDocuments = async (req: NextRequest) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const userId = searchParams.get("userId") || undefined;
  const result = await documentService.getAllDocuments(page, limit, search, userId);
  return NextResponse.json(result);
};

export const getDocumentById = async (id: string) => {
  await connectDB();
  const document = await documentService.getDocumentById(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  return NextResponse.json(document);
};

export const updateDocument = async (id: string, req: NextRequest) => {
  await connectDB();
  try {
    const data = await req.json();
    console.log(data,'ppppp')
    const document = await documentService.updateDocument(id, data);
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Document updated successfully", document });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
};

export const deleteDocument = async (id: string) => {
  await connectDB();
  const document = await documentService.getDocumentById(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  await deleteFile(document.publicId);
  await documentService.deleteDocument(id);
  return NextResponse.json({ message: "Document deleted successfully" });
};
