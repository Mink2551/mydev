import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../../../lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },

      // Check have an email or password?
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password are required");
        }

        // Find User form DB
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check have User?
        if (!user) {
          throw new Error("User not found");
        }

        // Checking a password
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        // Return value to session
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],

  // redirect Pages
  pages: {
    signIn: "/login", 
  },

  // Use JWT instead session
  session: {
    strategy: "jwt", 
  },

  // Call Back 
  callbacks: {
    // Assign Tokens
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // Assign Sessions
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  
  // Secreat from .env
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };