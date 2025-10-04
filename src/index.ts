import "dotenv/config";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema.js";
import { uuid } from "@electric-sql/pglite";

// await db.insert(usersTable).values({
//   id: uuid(),
//   email: "cacheman@upstash.com",
//   name: "Cache Man",
//   age: 100,
// });

const user = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, "cacheman@upstash.com"))
  .$withCache({ tag: "user.email.cacheman@upstash.com" });

const user2 = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, "cacheman2@upstash.com"))
  .$withCache({ tag: "user.email.cacheman2@upstash.com" });

// await db.$cache.invalidate({ tables: users });

await db
  .update(usersTable)
  .set({ name: "wowman" })
  .where(eq(usersTable.id, user[0]!.id));

// const userAfter = await db
//   .select()
//   .from(usersTable)
//   .where(eq(usersTable.email, user2[0]!.email))
//   .$withCache({ tag: `user.email.${user2[0]!.email}` });

console.log(
  JSON.stringify(
    {
      user,
      user2,
      // userAfter,
    },
    null,
    2
  )
);
