/* eslint-disable @typescript-eslint/no-unused-vars */
import { z } from "zod";

import { ClientEnvSchema } from "../types/zod/client-env.mjs";
import { ServerEnvSchema } from "../types/zod/server-env.mjs";

/**
 * Manually destruct process.env to make environment variables in Next.js edge runtimes and client-side available.
 * @type {Record<keyof z.infer<typeof ServerEnvSchema> | keyof z.infer<typeof ClientEnvSchema>, string | undefined>}
 */
export const processEnv = {
  DATABASE_URL: process.env.DATABASE_URL,

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXTAUTH_URL_INTERNAL: process.env.NEXTAUTH_URL_INTERNAL,

  NODE_ENV: process.env.NODE_ENV,

  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
