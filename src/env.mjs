// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { z } from "zod";

import { processEnv } from "./shared/process-env.mjs";
import { ClientEnvSchema } from "./types/zod/client-env.mjs";
import { ServerEnvSchema } from "./types/zod/server-env.mjs";

// --------------------------
// Don't touch this file
// --------------------------

const mergedEnvSchema = ServerEnvSchema.merge(ClientEnvSchema);

/** @typedef {z.input<typeof mergedEnvSchema>} MergedInput */
/** @typedef {z.infer<typeof mergedEnvSchema>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";
  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? mergedEnvSchema.safeParse(processEnv) // on server we can validate all env vars
      : ClientEnvSchema.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_")) {
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      }

      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { env };
