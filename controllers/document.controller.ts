import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import * as documentService from "@/services/document.service";
import { uploadFileToCloudinary, deleteFileFromCloudinary } from "@/lib/cloudinary";

const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/svg+xml",
  "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain", "text/csv",
  "application/zip", "application/x-rar-compressed", "application/x-7z-compressed",
  "video/mp4", "video/quicktime", "audio/mpeg", "audio/wav"
];

export const createDocument = async (userId: string, req: NextRequest) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const documentType = formData.get("documentType") as string;
    const expireDate = formData.get("expireDate") as string;
    const customerName = formData.get("customerName") as string;
    const email = formData.get("email") as string;
    const issueDate = formData.get("issueDate") as string;
    const notes = formData.get("notes") as string;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }
    if (!documentType) {
      return NextResponse.json({ error: "Document type is required" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "File type not supported" }, { status: 400 });
    }

    const uploadResult: any = await uploadFileToCloudinary(file);
    const document = await documentService.createDocument({
      userId,
      documentType,
      expireDate: expireDate ? new Date(expireDate) : undefined,
      filePath: uploadResult?.secure_url,
      publicId: uploadResult?.public_id,
      customerName,
      email,
      issueDate: issueDate ? new Date(issueDate) : undefined,
      notes,
    
    });

    return NextResponse.json({ message: "Document created successfully", document }, { status: 201 });
  } catch (error: any) {
    console.error("Document creation error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload document" }, { status: 500 });
  }
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
    const document = await documentService.getDocumentById(id);
    if (!document) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const documentType = formData.get("documentType") as string;
    const expireDate = formData.get("expireDate") as string;
    const isActive = formData.get("isActive") as string;
    const customerName = formData.get("customerName") as string;
    const email = formData.get("email") as string;
    const issueDate = formData.get("issueDate") as string;
    const notes = formData.get("notes") as string;

    const updateData: any = {};
    if (documentType) updateData.documentType = documentType;
    if (expireDate) updateData.expireDate = new Date(expireDate);
    if (isActive !== null) updateData.isActive = isActive === "true";
    if (customerName) updateData.customerName = customerName;
    if (email) updateData.email = email;
    if (issueDate) updateData.issueDate = new Date(issueDate);
    if (notes) updateData.notes = notes;

    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "File type not supported" }, { status: 400 });
      }
      await deleteFileFromCloudinary(document?.publicId);
      const uploadResult: any = await uploadFileToCloudinary(file);
      updateData.filePath = uploadResult.secure_url;
      updateData.publicId = uploadResult.public_id;
    }

    const updatedDocument = await documentService.updateDocument(id, updateData);
    return NextResponse.json({ message: "Document updated successfully", document: updatedDocument });
  } catch (error: any) {
    console.error("Update document error:", error);
    return NextResponse.json({ error: error?.message || "Failed to update document" }, { status: 500 });
  }
};

export const deleteDocument = async (id: string) => {
  await connectDB();
  const document = await documentService.getDocumentById(id);
  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }
  await deleteFileFromCloudinary(document.publicId);
  await documentService.deleteDocument(id);
  return NextResponse.json({ message: "Document deleted successfully" });
};

export const createDocumentForUser = async (adminId: string, req: NextRequest) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const documentType = formData.get("documentType") as string;
    const expireDate = formData.get("expireDate") as string;
    const userId = formData.get("userId") as string;

    if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });
    if (!documentType) return NextResponse.json({ error: "Document type is required" }, { status: 400 });
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    if (!ALLOWED_TYPES.includes(file.type)) return NextResponse.json({ error: "File type not supported" }, { status: 400 });

    const uploadResult: any = await uploadFileToCloudinary(file);
    const document = await documentService.createDocument({
      userId,
      documentType,
      expireDate: expireDate ? new Date(expireDate) : undefined,
      filePath: uploadResult?.secure_url,
      publicId: uploadResult?.public_id,
    });

    return NextResponse.json({ message: "Document created successfully", document }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to upload document" }, { status: 500 });
  }
};
