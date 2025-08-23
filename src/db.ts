import "dotenv/config";
import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle({
    connection: {
        connectionString: process.env.DATABASE_URL,
    },
    cache: upstashCache({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
        // 👇 Enable caching for all queries by default (optional)
        global: true,

        // 👇 Default cache behavior (optional)
        config: { ex: 60 * 10 }
    }),

});
