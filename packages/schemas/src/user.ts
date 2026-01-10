import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { users } from "@repo/db/schema";

const insertUserSchemaBase = createInsertSchema(users, {
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
});

export const createUserSchema = insertUserSchemaBase.omit({ id: true });
export const updateUserSchema = insertUserSchemaBase
  .omit({ id: true })
  .partial();

// Export the types
export type User = typeof users.$inferSelect;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
