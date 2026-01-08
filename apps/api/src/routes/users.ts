import { Hono } from "hono";
import { db, users } from "@repo/db";
import { UserSchema, CreateUserSchema } from "@repo/schemas";

//This function runs as a middleware between each request and response
import { zValidator } from "@hono/zod-validator";

export const usersRoute = new Hono()
  .get("/", zValidator("query", UserSchema), async (c) => {
    const result = await db.select().from(users);
    return c.json(result);
  })
  .post("/", zValidator("json", CreateUserSchema), async (c) => {
    return c.json({ message: "User created" });
  });
