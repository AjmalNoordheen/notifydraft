import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    centerName: {
      type: String,
    },
    userRole: {
      type: String,
      enum: ["super_admin", "admin", "user"],
      default: "user",
    },
    isAcive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || mongoose.model("User", UserSchema);
