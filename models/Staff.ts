import mongoose, { Schema, models } from "mongoose";

const StaffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Staff = models.Staff || mongoose.model("Staff", StaffSchema);
