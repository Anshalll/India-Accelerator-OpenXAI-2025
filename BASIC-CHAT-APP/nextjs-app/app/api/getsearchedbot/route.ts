import { NextResponse } from "next/server";
import { BotModel } from "@/models/model";

export async function POST(req: Request) {
  try {
    const { term } = await req.json();
    console.log(term)
    if (!term || typeof term !== "string") {
      return NextResponse.json({ error: "Search term is required." }, { status: 400 });
    }

    // Case-insensitive search for bot name
    const bots = await BotModel.find({
      name: { $regex: term, $options: "i" }
    }).limit(20);

    return NextResponse.json({ bots }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}