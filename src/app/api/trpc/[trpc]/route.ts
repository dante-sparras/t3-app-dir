import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "~/env.mjs";
import { apiRouter } from "~/server/api/api-router";
import { createTRPCContext } from "~/server/api/trpc";

/**
 * This is the server RPC handler for trpc.
 */
function handler(request: NextRequest) {
  // we currently have to use fetchRequestHandler beacuse
  // of poor support from trpc for Next.js 13 with app directory
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: apiRouter,
    createContext: createTRPCContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  });
}

export { handler as GET, handler as POST };
