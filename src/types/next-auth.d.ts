// Import the NextAuth module, which is used for authentication in Next.js applications.
import NextAuth from "next-auth";

// Declare a new module for extending the existing 'Session' interface provided by NextAuth.
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   * Defines the shape of the 'Session' object that contains user information.
   */
  interface Session {
    user: {
      name: string;         // The name of the authenticated user.
      email: string;        // The email of the authenticated user.
      image: string;        // The profile image URL of the authenticated user.
      provider: string;     // The authentication provider used (e.g., "google", "facebook", etc.).
    };
  }
}
