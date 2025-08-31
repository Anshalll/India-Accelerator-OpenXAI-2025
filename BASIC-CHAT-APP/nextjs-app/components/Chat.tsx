"use client"

import React, { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation";
import { Send } from 'lucide-react';
export default function Chat({ setBotImage, setBotname }: { setBotname: React.Dispatch<React.SetStateAction<string>>, setBotImage: React.Dispatch<React.SetStateAction<string>> }) {

    interface MessageData {
        Message: string;
        Type: string;
        timestamp: string;
    }



    interface ChatDataType {
        aimessage: string,
        timestamp: string,
        usermessage: string
    }
    const params = useParams();
    const router = useRouter();
    const { id } = params;

    const [Message, setMessage] = useState<string>("")
    const [Loading, setLoading] = useState<boolean>(false)
    const [Output, setOutput] = useState<string>("")
    const [Error, setError] = useState<string>("")
    const [ChatData, setChatData] = useState<Array<MessageData>>([])
    const [BotName, setBotName] = useState<string>("")
    const [BotRole, setBotRole] = useState<string>("")
    const messagesEndRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const verifyBot = async () => {
            if (!id) return;
            try {
                const res = await fetch("/api/verifybot", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();

                setBotName(data.bot.name)
                setBotRole(data.bot.desc)
                setBotname(data.bot.name)
                setBotImage(data.bot.image)

                if (!res.ok || !data.exists) {
                    router.replace("/404");
                }
            } catch {
                router.replace("/404");
            }
        };
        verifyBot();
    }, [id, router]);


    useEffect(() => {
        const fetchChats = async () => {
            if (!id) return;
            try {
                const res = await fetch("/api/getchat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ botid: id }),
                });
                const data = await res.json();

                if (res.ok && data.chats) {

                    const formattedChats: MessageData[] = [];
                    data.chats.forEach((chat: ChatDataType) => {
                        if (chat.usermessage) {
                            formattedChats.push({ Message: chat.usermessage, Type: "user", timestamp: chat.timestamp });
                        }
                        if (chat.aimessage) {
                            formattedChats.push({ Message: chat.aimessage, Type: "ai", timestamp: chat.timestamp });
                        }
                    });
                    setChatData(formattedChats);
                }
            } catch (error) {
                console.error(error)
                setError("Failed to load chats.");
            }
        };
        fetchChats();
    }, [id]);

    useEffect(() => {
        const scrollableDiv = document.getElementById("scrolldiv");
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
        }
    }, [ChatData]);

    const handleSendData = async () => {
        setLoading(true)
        setOutput("")
        let finalMessage = "";
        const timestamp = new Date().toISOString();
        setChatData((prev) => [
            ...prev,
            { Message: Message, Type: "user", timestamp }
        ]);
        const response = await fetch("http://localhost:3000/api/aichat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ history: ChatData, message: Message, role: BotRole, name: BotName }),
        })



        setMessage("")
        if (!response.ok) {
            setError("An error occurred!")
            setTimeout(() => setError(""), 3000)
        } else {
            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    const chunk = decoder.decode(value, { stream: true })
                    const lines = chunk.split("\n").filter(Boolean)
                    for (const line of lines) {
                        try {
                            const data = JSON.parse(line)
                            finalMessage += data.content;
                            setOutput(prev => prev + data.content)
                        } catch (err) {
                            console.error("Failed to parse chunk:", err, line)
                        }
                    }
                }
            }
            setChatData((prev) => [
                ...prev,
                { Message: finalMessage, Type: "ai", timestamp }
            ]);
            setOutput("")
            const postmessage = await fetch(`http://localhost:3000/api/postmessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: Message, ai: finalMessage, id }),
            })
            if (!postmessage.ok) {
                setError("An error occured!")
            }
            await postmessage.json()
        }
        setLoading(false)
    }

    return (
        <div className="flex h-[calc(100%-80px)] flex-col w-full p-[20px]">
            <div ref={messagesEndRef} id="scrolldiv" className="Scroller h-[calc(100%-40px)] flex flex-col  gap-[10px] rounded-lg w-full overflow-y-auto">
                {ChatData.map((value, index) => (
                    <div key={index} className={`${value.Type === "ai" ? "justify-start" : "justify-end"} flex w-full  `}>
                        <p className="bg-[#262929] max-w-[600px]  p-[10px] rounded-lg">{value.Message}</p>
                    </div>
                ))}
                {Output.trim() !== "" && <div className={` justify-start  flex w-full  `}>
                    <p className="bg-[#262929] max-w-[600px]  p-[10px] rounded-lg">{Output}</p>
                </div>}
                {Error && <p className="text-red-500">{Error}</p>}
            </div>
            <div className="p-[20px] flex  w-full items-center justify-center">
                <div className="w-[50%] flex bg-gray-800 h-[50px] rounded-full  text-white">
                
                <input
                    className=" w-[92%] px-[20px] outline-none  h-full  "
                    type="text"
                    placeholder="Talk to ai..."
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {Loading ? (
                    <p>Loading...</p>
                ) : (
                    <button
                        className=" "
                        onClick={handleSendData}
                    > 
                        <Send  className="h-[40px] w-[40px] rounded-full  text-white bg-gray-700 px-[10px]"/>
                    </button>
                )}

                </div>

            </div>
        </div>
    )
}