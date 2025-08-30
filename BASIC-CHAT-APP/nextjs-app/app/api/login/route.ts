import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

const users = [
  { id: 1, username: "john", email: "john@example.com", password: "password123" },
  { id: 2, username: "jane", email: "jane@example.com", password: "securepass" },
];

const JWT_SECRET = process.env.JWT_SECRET || "jwt"; 

export async function POST(req: Request) {
  const { identifier, password } = await req.json();


  const user = users.find(
    (u) =>
      (u.username === identifier || u.email === identifier) &&
      u.password === password
  );

  if (!user) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }
  

  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

 
  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",

  })

  return response
}
