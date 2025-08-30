import {  NextResponse } from 'next/server'
import ollama from 'ollama'
const model = 'llama3'

export async function POST(req: Request) {

    try {
        const data = await req.json();
        const user_message = data.message;
        console.log(data)
        const response = await ollama.chat({
            model,
            messages: [{ role: 'user', content: user_message }],
            stream: true,
        })



        const stream = new TransformStream()
        const writer = stream.writable.getWriter()

            ; (async () => {
                try {
                    for await (const part of response) {

                        const chunk = JSON.stringify({ content: part.message?.content || "" })
                        const encoder = new TextEncoder()
                        await writer.write(encoder.encode(chunk + "\n"))
                    }
                } finally {
                    writer.close()
                }
            })()

        return new NextResponse(stream.readable, {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
    }
    catch (e){
        console.log(e)
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 })
    }


}