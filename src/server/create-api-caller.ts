import "server-only";

import { apiRouter } from "./api/api-router";
import { createTRPCContext } from "./api/trpc";

/**
 * Helper function for creating a tRPC caller.
 * Use this in server components to call the API.
 * @returns A set of type-safe react-query hooks for your tRPC API.
 */
export const createApiCaller = async () => {
  return apiRouter.createCaller(await createTRPCContext());
};
