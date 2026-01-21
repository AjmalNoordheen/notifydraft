import mongoose, { Schema, models } from "mongoose";

const DocumentTypeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const DocumentType = models.DocumentType || mongoose.model("DocumentType", DocumentTypeSchema);
