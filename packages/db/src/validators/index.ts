import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "../schema";
import z from "zod";

export const selectUserSchema = createSelectSchema(user);
const insertUserSchemaBase = createInsertSchema(user, {
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Email must be valid" }),
  role: z.enum(["user", "admin"]),
})
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .omit({
    id: true,
    emailVerified: true,
    createdAt: true,
    updatedAt: true,
    banned: true,
    banReason: true,
    banExpires: true,
  });

export const insertUserSchema = insertUserSchemaBase.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);
export const updateUserSchema = insertUserSchemaBase
  .partial()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
