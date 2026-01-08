import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  createdAt: z.date().optional(),
});

// POST Method schema for creating a new user
export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// TypeScript types inferred from the schemas
export type UserSchemaT = z.infer<typeof UserSchema>;
export type CreateUserSchemaT = z.infer<typeof CreateUserSchema>;
