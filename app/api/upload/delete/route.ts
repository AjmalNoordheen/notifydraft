import { NextRequest, NextResponse } from "next/server";
import { authenticateRequest } from "@/lib/auth";
import { deleteFile } from "@/utils/cloudinary";

export async function DELETE(req: NextRequest) {
  const auth = authenticateRequest(req);
  if (!auth.authenticated) return auth.error;

  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID is required" }, { status: 400 });
    }

    await deleteFile(publicId);
    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
