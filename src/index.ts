import "dotenv/config";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema.js";
import { uuid } from "@electric-sql/pglite";

await db.insert(usersTable).values({
  id: uuid(),
  email: "cacheman@upstash.com",
  name: "Cache Man",
  age: 100,
});

const users = await db.select().from(usersTable).$withCache();

// await db.$cache.invalidate({ tables: users });

// await db
//   .update(users)
//   .set({ name: "wowman" })
//   .where(eq(users.id, user1[0]?.id!));

console.log(
  JSON.stringify(
    {
      users,
    },
    null,
    2
  )
);
