// Importing necessary dependencies.
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Define the middleware function that will be executed before processing each incoming request.
export async function middleware(req: NextRequest) {
  // Extract the 'pathname' and 'origin' from the incoming request's URL.
  const { pathname, origin } = req.nextUrl;

  // Use 'getToken' function to retrieve the session token from the request.
  // The 'getToken' function requires the 'req' object and the secret for token verification (NEXTAUTH_SECRET).
  // The 'secureCookie' option indicates whether secure cookies should be used, typically set to 'true' in production.
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  // Handle redirection logic based on the 'pathname' and the presence of a session token.

  // If the 'pathname' is the root ("/") and there is no session token (user not authenticated):
  if (pathname === "/") {
    if (!session)
      // Redirect the user to the authentication page (NEXTAUTH_URL) to sign in or sign up.
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth`);
  }

  // If the 'pathname' is the authentication page ("/auth") and there is a session token (user authenticated):
  if (pathname === "/auth") {
    if (session)
      // Redirect the user to the 'origin' (origin of the current request) as they are already authenticated.
      return NextResponse.redirect(`${origin}`);
  }
}

