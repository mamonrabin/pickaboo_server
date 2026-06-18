import crypto from "crypto";

export const generateSlug = (text: string): string => {
  const slug = text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return `${slug}-${Date.now().toString(36)}-${crypto.randomBytes(2).toString("hex")}`;
};