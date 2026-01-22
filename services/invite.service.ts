import { InviteLink } from "@/models/InviteLink";
import crypto from "crypto";

export const createInviteLink = async (adminId: string) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  return await InviteLink.create({ token, createdBy: adminId, expiresAt });
};

export const validateInviteToken = async (token: string) => {
  const invite = await InviteLink.findOne({ token, isUsed: false });
  if (!invite) return null;
  if (new Date() > invite.expiresAt) return null;
  return invite;
};

export const markInviteAsUsed = async (token: string) => {
  return await InviteLink.findOneAndUpdate({ token }, { isUsed: true }, { new: true });
};
