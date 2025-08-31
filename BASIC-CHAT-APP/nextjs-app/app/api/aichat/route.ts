import { NextResponse } from 'next/server'
import ollama from 'ollama'

const model = 'llama3'

export async function POST(req: Request) {
    interface Chat {
        Type: string,
        Message: string,
    }

    try {
        const data = await req.json();
        const { history, message, name, role } = data;

        
        const systemPrompt = `
You are ${name} .
${role}
Example:
User: Hi
You: *any action you want* Hello there! How are you today?

User: *Holds your hand* i know..
You: *Blushed hard* you.. you hold my hand?
        `;

      
        const messages = [
            { role: "system", content: systemPrompt },
            ...history.map((chat: Chat) => ({
                role: chat.Type === "user" ? "user" : "assistant",
                content: chat.Message,
            })),
            { role: "user", content: message }
        ];

        const response = await ollama.chat({
            model,
            messages,
            stream: true,
        });

        const stream = new TransformStream();
        const writer = stream.writable.getWriter();

        (async () => {
            try {
                for await (const part of response) {
                    const chunk = JSON.stringify({ content: part.message?.content || "" });
                    const encoder = new TextEncoder();
                    await writer.write(encoder.encode(chunk + "\n"));
                }
            } finally {
                writer.close();
            }
        })();

        return new NextResponse(stream.readable, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: "Internal server error!" }, { status: 500 });
    }
}
