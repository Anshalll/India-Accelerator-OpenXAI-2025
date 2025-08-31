import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { RegisterModel, BotModel } from "@/models/model";

const JWT_SECRET = process.env.JWT_SECRET || "jwt";

export async function GET(req: Request) {
    try {

        const cookieHeader = req.headers.get("cookie");
        const tokenMatch = cookieHeader?.match(/token=([^;]+)/);
        const token = tokenMatch ? tokenMatch[1] : null;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET) as { id: string, username: string };
        } catch (error) {
            console.error(error)
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }


        const user = await RegisterModel.findById(decoded.id).select("-password");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log()
        const bots = await BotModel.find({  createdby: user._id  });

        return NextResponse.json({ user, bots }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}