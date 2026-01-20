import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
    },
    centerName: {
      type: String,
      required: true, 
    },
    userRole: {
      type: String,
      enum: ["super_admin", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
