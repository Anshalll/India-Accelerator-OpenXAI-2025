import { ChatBotModel  } from "@/models/model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const body = await req.json();

        
        const chat = new ChatBotModel({
            usermessage: body.user,
            aimessage: body.ai
               
        });

        
        await chat.save();

        return NextResponse.json({ message: "Chats saved!"} , {status: 200});
    }
    catch {
        return NextResponse.json({ error: "Internal server error!"} , {status: 500});

    }
}