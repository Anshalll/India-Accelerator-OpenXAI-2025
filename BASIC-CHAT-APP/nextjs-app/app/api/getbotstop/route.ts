import { NextResponse } from "next/server";
import { BotModel } from "@/models/model";

export async function GET() {
  try {
    
    const bots = await BotModel.find({})
      .sort({ _id: -1 })
      .limit(10);
    
    return NextResponse.json({ bots }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}