import mongoose, { Schema, models } from "mongoose";

const InviteLinkSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const InviteLink = models.InviteLink || mongoose.model("InviteLink", InviteLinkSchema);
