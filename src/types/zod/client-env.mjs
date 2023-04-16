import { z } from "zod";

/**
 * Prefix with `NEXT_PUBLIC_` to make them available to the client.
 */
export const ClientEnvSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
});
