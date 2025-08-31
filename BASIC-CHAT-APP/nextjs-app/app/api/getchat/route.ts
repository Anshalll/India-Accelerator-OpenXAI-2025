import { NextResponse } from "next/server";
import { BotModel, ChatBotModel } from "@/models/model";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "jwt";

export async function POST(req: Request) {
    try {
        const { botid } = await req.json();

        if (!botid) {
            return NextResponse.json({ error: "userid and botid are required." }, { status: 400 });
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

        const find_bot = await BotModel.findOne({
            uniqueid: botid
        })

        if (!find_bot) {
            return NextResponse.json({ error: "No bot found!" }, { status: 400 });
        }

        

        const chats = await ChatBotModel.find({
            uid: decoded.id,
            belongsto: find_bot._id
        }).sort({ timestamp: 1 });
        console.log(chats)

        return NextResponse.json({ chats }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}