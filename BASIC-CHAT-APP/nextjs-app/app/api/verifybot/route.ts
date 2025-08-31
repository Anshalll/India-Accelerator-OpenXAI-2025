import { NextResponse } from "next/server";
import { BotModel } from "@/models/model";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
  
    if (!id) {
      return NextResponse.json({ error: "Bot id is required." }, { status: 400 });
    }

    const bot = await BotModel.findOne({ uniqueid: id })
    
    if (bot) {
      return NextResponse.json({ exists: true, bot }, { status: 200 });
    } else {
      return NextResponse.json({ exists: false }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}