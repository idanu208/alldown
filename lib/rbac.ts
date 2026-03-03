import { Role } from "@prisma/client";

export function canManageContent(role?: Role) {
  return role === Role.ADMIN || role === Role.INSTRUCTOR;
}

export function isAdmin(role?: Role) {
  return role === Role.ADMIN;
}
