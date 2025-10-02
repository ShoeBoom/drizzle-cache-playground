import { PGlite } from "@electric-sql/pglite";
import "dotenv/config";
import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/pglite";

const client = new PGlite("./pgdata");

export const db = drizzle({
  client,
  cache: upstashCache({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    // 👇 Enable caching for all queries by default (optional)
    global: true,

    // 👇 Default cache behavior (optional)
    config: { ex: 60 * 10 },
  }),
});
