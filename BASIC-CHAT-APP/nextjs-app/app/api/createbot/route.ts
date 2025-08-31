import { BotModel } from "@/models/model";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.desc || !body.image || !body.role) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }


    const cookieHeader = req.headers.get("cookie");

    const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { username: string, id: string }

    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    
    const uniqueid = randomUUID();

    const bot = new BotModel({
      name: body.name,
      desc: body.desc,
      image: body.image,
      uniqueid: uniqueid,
      role: body.role,
      createdby: decoded.id
    });

    await bot.save();

    return NextResponse.json({ message: "Bot created successfully!", uniqueid }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}