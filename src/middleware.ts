import { type NextRequest, NextResponse } from "next/server";
import { getToken as getJwt } from "next-auth/jwt";

/**
 * Return a redirect response to the login page.
 * @param origin The origin of the request.
 * @param requestParams The query parameters of the request.
 */
function loginPage(origin: string, requestParams: URLSearchParams) {
  // create responseParams and set the callbackUrl to user page
  const responseParams = new URLSearchParams(requestParams);
  responseParams.set("callbackUrl", "/user");

  const redirectUrl = new URL(
    `/api/auth/signin?${responseParams.toString()}`,
    origin
  );
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.delete("token");

  return response;
}

/**
 * Return a redirect response to the homepage.
 * @param origin The origin of the request.
 */
function homePage(origin: string) {
  return NextResponse.redirect(new URL("/", origin));
}

/**
 * Middleware to protect pages. [Documentation](https://nextjs.org/docs/advanced-features/middleware)
 * @param req The request object.
 */
export default async function middleware(req: NextRequest) {
  const {
    nextUrl: { searchParams, origin, pathname },
  } = req;
  const isHomePageRequest = pathname === "/";
  const isLoginPageRequest = pathname === "/login";
  const jwt = await getJwt({ req, raw: true });
  const isLoggedIn = jwt ? true : false;

  if (isHomePageRequest && isLoggedIn) {
    return NextResponse.redirect(new URL("/user", origin));
  }
  if (isHomePageRequest) return NextResponse.next();

  if (!isLoggedIn) return loginPage(origin, searchParams);
  if (isLoggedIn && isLoginPageRequest) return homePage(origin);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
