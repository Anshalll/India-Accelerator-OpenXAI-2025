import { BotModel } from "@/models/model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

    const body = await req.json();
    if (!body.name || !body.desc || !body.image) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const bot = new BotModel({
      name: body.name,
      desc: body.desc,
      image: body.image,
    });

    await bot.save();

    return NextResponse.json({ message: "Bot created successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}