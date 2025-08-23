import "dotenv/config";
import { db } from "./db.js";
import { eq } from "drizzle-orm";
import { usersTable as users} from "./db/schema.js";

// await db.insert(usersTable).values({email: "cacheman@upstash.com", name: "Cache Man", age: 100 });

const user1 = await db.select().from(users).where(eq(users.id, "0465dbe5-9f8e-4eab-15f6-aec8d6db8fbe")).$withCache();
const user2 = await db.select().from(users).where(eq(users.id, "0b8d2913-1e1d-4a3a-e746-4525a4bf0131")).$withCache();

// await db.$cache.invalidate({ tables: users });

await db.update(users).set({name: "wowman"}).where(eq(users.id, user1[0]?.id!))

console.log(JSON.stringify({
    user1,
    user2
}, null, 2));
