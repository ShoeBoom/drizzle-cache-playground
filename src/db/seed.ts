import { seed } from "drizzle-seed";
import { usersTable } from "./schema.js";
import { db } from "../db.js";

await seed(db, { usersTable }, {count: 100});