import "server-only";

import { initTRPC, TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "~/server/prisma-database";

import { getServerSession } from "../get-server-session";

/**
 * tRPC server stuff is assembled and linked here.
 */

/** ===========================================================================
 * CONTEXT
 =========================================================================== */

/**
 * Generating tRPC context internals.
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
function createInnerTRPCContext(session: Session | null) {
  return {
    session,
    prisma,
  };
}
/**
 * Context for router processing all tRPC endpoint requests.
 * @see https://trpc.io/docs/server/context
 */
export async function createTRPCContext() {
  return createInnerTRPCContext(await getServerSession());
}

/** ===========================================================================
 * INITIALIZATION
 =========================================================================== */

/**
 * Initializes tRPC API, connects context & transformer. Parses ZodErrors for frontend typesafety.
 * @see https://trpc.io/docs/quickstart#1-create-a-router-instance
 */
const t = initTRPC.context<typeof createInnerTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/** ===========================================================================
 * ROUTER
 =========================================================================== */

/**
 * Create new routers/sub-routers for tRPC API.
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/** ===========================================================================
 * MIDDELWARE
 =========================================================================== */

/**
 * Middleware ensuring user login before and after executing procedure.
 * @see https://trpc.io/docs/server/server-side-calls#context-with-middleware-example
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const session = {
    ...ctx.session,
    user: ctx.session.user,
  };

  return next({
    ctx: {
      session,
    },
  });
});

/** ===========================================================================
 * PROCEDURES
 =========================================================================== */

/**
 * public (unauthenticated)
 * @see https://trpc.io/docs/procedures
 */
export const publicProcedure = t.procedure;
/**
 * protected (authenticated)
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
