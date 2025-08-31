"use client"

import React, { useState, useEffect, useRef } from "react"

export default function Chat() {

    interface MessageData {
        Message: string;
        Type: string,
    }

    const [Message, setMessage] = useState<string>("")
    const [Loading, setLoading] = useState<boolean>(false)
    const [Output, setOutput] = useState<string>("")
    const [Error, setError] = useState<string>("")
    const [ChatData, setChatData] = useState<Array<MessageData>>([])

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollableDiv = document.getElementById("scrolldiv");
        if (scrollableDiv) {
            scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
            console.log(scrollableDiv.scrollHeight);

        }
    }, [ChatData]);

    const handleSendData = async () => {
        setLoading(true)
        setOutput("")
        let finalMessage = "";
        const response = await fetch("http://localhost:3000/api/aichat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: Message }),
        })

        setChatData((prev) => [
            ...prev,

            { Message: Message, Type: "user" }
        ]);
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

                { Message: finalMessage, Type: "ai" }
            ]);

            setOutput("")

            const postmessage = await fetch(`http://localhost:3000/api/postmessage`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: Message, ai: finalMessage }),
            })
            if (!postmessage.ok) {
                setError("An error occured!")
            }
            const data_posted = await postmessage.json()
            


        }

        setLoading(false)
    }

    return (

        <div className="flex h-[calc(100%-40px)] flex-col w-full p-[20px]">
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
            <div className="p-[20px]">



                <input
                    className="bg-white text-black"
                    type="text"
                    value={Message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                {Loading ? (
                    <p>Loading...</p>
                ) : (
                    <button
                        className="bg-green-500 text-black px-[20px]"
                        onClick={handleSendData}
                    >
                        Send
                    </button>
                )}
            </div>

        </div>

    )
}
