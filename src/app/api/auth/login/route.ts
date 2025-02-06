import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../../../lib/prisma";
 
// Get Secret Key
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; 

export async function POST(req: Request) {
  try {

    // Catch Data from User
    const { email, password } = await req.json();

    // Find User Data from Email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check Have a User?
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ReHash a password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Set Token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: "7d",
    });

    // Return Token and Data
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } }, { status: 200 });

    // Error Prompt
  } catch (e) {
    return NextResponse.json({ error: `Error: ${e}` }, { status: 400 });
  }
}
