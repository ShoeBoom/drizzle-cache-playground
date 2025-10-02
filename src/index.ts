import "dotenv/config";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { usersTable as users } from "./db/schema.js";
import { uuid } from "@electric-sql/pglite";

await db
  .insert(users)
  .values({
    id: uuid(),
    email: "cacheman@upstash.com",
    name: "Cache Man",
    age: 100,
  });

const user1 = await db
  .select()
  .from(users)
  .where(eq(users.email, "cacheman@upstash.com"))
  .$withCache();

// await db.$cache.invalidate({ tables: users });

await db
  .update(users)
  .set({ name: "wowman" })
  .where(eq(users.id, user1[0]?.id!));

console.log(
  JSON.stringify(
    {
      user1,
    },
    null,
    2
  )
);
