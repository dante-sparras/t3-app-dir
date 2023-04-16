import NextAuth from "next-auth";

import { authOptions } from "./auth-options";

// https://next-auth.js.org/configuration/initialization#route-handlers-app
const handler = NextAuth(authOptions) as unknown;

export { handler as GET, handler as POST };
