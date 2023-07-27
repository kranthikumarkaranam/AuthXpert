// Import necessary modules and providers for authentication
import NextAuth, { Account, User } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";

// Import MongoDBAdapter and clientPromise for MongoDB integration
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

// Import JWT and Adapter types for callbacks
import { JWT } from "next-auth/jwt";
import { Adapter } from "next-auth/adapters";

// Import necessary utility functions and model for database operations
import connectDb from "@/utils/connectDb";
import UserModal from "@/models/User";
import bcrypt from "bcryptjs";

// NextAuth configuration object
export default NextAuth({
  // Set the MongoDBAdapter as the adapter to work with MongoDB
  adapter: MongoDBAdapter(clientPromise),
  
  // Define the authentication providers to be used
  providers: [
    // CredentialsProvider for custom email/password authentication
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // Custom authentication logic using MongoDB to find the user by email
        await connectDb();
        const user = await UserModal.findOne({ email: credentials!.email });
        if (!user) {
          throw new Error("This email is not registered :(");
          
        }
        const isPasswordCorrect = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) {
          throw new Error("Warning! Password is incorrect");
        }
        return user;
      },
    }),
    // Other providers for social media logins
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_ID as string,
      clientSecret: process.env.AUTH0_SECRET as string,
      issuer: process.env.AUTH0_ISSUER_URL as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string,
    }),
    
  ],
  
  // Set the secret used to sign cookies and tokens
  secret: process.env.NEXTAUTH_SECRET,
  
  // Use JWT strategy for session management
  session: {
    strategy: "jwt",
  },
  
  // Define the custom pages for authentication
  pages: {
    signIn: "/auth",
  },
  
  // Define callback functions for token and session management
  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
    }) {
      // Add the provider information to the token
      if (user) {
        token.provider = account?.provider;
      }
      return token;
    },


    async session({ session, token }: { session: any; token: JWT }) {
      // Add the provider information to the session
      if (session.user) {
        session.user.provider = token.provider;
      }
      return session;
    },
  },
});
