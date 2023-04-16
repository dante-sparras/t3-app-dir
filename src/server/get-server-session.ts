import "server-only";

import { getServerSession as getServerSessionAuth } from "next-auth";

import { authOptions } from "~/app/api/auth/[...nextauth]/auth-options";

/**
 * Helper function to get the server session from Auth in server components without having to
 * having to import the authOptions in every file.
 */
export async function getServerSession() {
  return await getServerSessionAuth(authOptions);
}
