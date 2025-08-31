import { NextResponse } from "next/server";

import { ChatBotModel } from "@/models/model";
import jwt from "jsonwebtoken";
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
            decoded = jwt.verify(token, JWT_SECRET) as { username: string, id: string }

        } catch (error) {
            console.log(error)
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }



        const bots = await ChatBotModel.find({ uid: decoded.id }).populate("belongsto").select("-uid")
            .sort({ _id: -1 })
            .limit(10);


        interface typedata {
            name: string,
            image: string,
            uniqueid: string,
        }
        const arr: string[] = [];
        const datatosend: typedata[] = [];
     
        if (bots.length > 0) {
            for (const a of bots) {
                if (!arr.includes(a?.belongsto?.uniqueid)) {
                    arr.push(a?.belongsto?.uniqueid);

                    datatosend.push({
                        uniqueid: a.belongsto.uniqueid,
                        name: a.belongsto.name,
                        image: a.belongsto.image
                    });
                }
            }

        }





        return NextResponse.json({ datatosend }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}