import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

// Directly define NextAuth options inside the handler
export const GET = async (req) => {
  const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" },
        },
        // Check for email and password
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
          }

          // Find user in the DB
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Check if user exists
          if (!user) {
            throw new Error("User not found");
          }

          // Check password
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          // Return user data to the session
          return { id: user.id, name: user.name, email: user.email };
        },
      }),
    ],

    // Redirect Pages
    pages: {
      signIn: "/login",
    },

    // Use JWT instead of session
    session: {
      strategy: "jwt",
    },

    // Callbacks for JWT and session handling
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.name = token.name;
        }
        return session;
      },
    },

    // Secret from .env
    secret: process.env.NEXTAUTH_SECRET,
  };

  // Handle NextAuth request and response
  const res = NextResponse.next();
  return NextAuth(req, res, authOptions);
};

export const POST = async (req) => {
  const authOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and Password are required");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Invalid credentials");
          }

          return { id: user.id, name: user.name, email: user.email };
        },
      }),
    ],

    pages: {
      signIn: "/login",
    },

    session: {
      strategy: "jwt",
    },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },

      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id;
          session.user.email = token.email;
          session.user.name = token.name;
        }
        return session;
      },
    },

    secret: process.env.NEXTAUTH_SECRET,
  };

  const res = NextResponse.next();
  return NextAuth(req, res, authOptions);
};
