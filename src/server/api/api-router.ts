import "server-only";

import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const apiRouter = createTRPCRouter({
  example: exampleRouter,
});

// export type definition of API
export type ApiRouter = typeof apiRouter;
