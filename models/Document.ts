import mongoose, { Schema, models } from "mongoose";

const DocumentSchema = new Schema(
  {
    userId:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    issueDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
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



