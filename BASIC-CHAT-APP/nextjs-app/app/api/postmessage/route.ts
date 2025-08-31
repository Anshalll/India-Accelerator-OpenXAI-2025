import { ChatBotModel, BotModel, RegisterModel } from "@/models/model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "jwt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
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

        const user = await RegisterModel.findById(decoded.id)
        if (!user) {
             return NextResponse.json({ error: "User not found!" }, { status: 400 });
        }

      
        const bot = await BotModel.findOne({ uniqueid: body.id });
        if (!bot) {
            return NextResponse.json({ error: "Bot not found!" }, { status: 404 });
        }
        
        const chat = new ChatBotModel({
            uid: user._id,
            aimessage: body.ai,
            usermessage: body.user,
            belongsto: bot._id
        });

        await chat.save();

        return NextResponse.json({ message: "Chats saved!" }, { status: 200 });
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}