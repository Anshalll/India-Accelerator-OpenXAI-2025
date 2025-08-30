import { NextResponse , NextRequest } from "next/server";
 

export async function POST(req: Request){
    const data  = await req.json()
    console.log(data)
    return NextResponse.json({  "data" : "Data recieved" })
}