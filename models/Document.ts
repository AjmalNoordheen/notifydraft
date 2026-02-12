import mongoose, { Schema, models } from "mongoose";

const DocumentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    documentType: {
      type: String,
      required: true
    },
    expireDate: {
      type: Date,
    },
    filePath:{
        type: String,
        required: true
    },
    publicId:{
        type: String,
        required: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Document = models.Document || mongoose.model("Document", DocumentSchema);
