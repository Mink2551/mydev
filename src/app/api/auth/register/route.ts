import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {prisma} from "../../../../../lib/prisma"; // ต้องสร้าง prisma client

export async function POST(req: Request) {
  
  // Catch Data From User
  const { username, email, password } = await req.json();
  
  // Hash a Password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create User in DB
    const user = await prisma.user.create({
      // Data
      data: { name: username, email, password: hashedPassword },
    });

    // Return Status
    return NextResponse.json({ user }, { status: 201 });

    // Error status
  } catch (error) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}
 