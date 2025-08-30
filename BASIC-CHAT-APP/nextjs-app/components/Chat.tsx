"use client"

import React, { useState } from "react"

export default function Chat() {
    const [Message, setMessage] = useState<string>("")
    const [Loading, setLoading] = useState<boolean>(false)
    const [Output, setOutput] = useState<string>("")
    const [Error, setError] = useState<string>("")
    
    const handleSendData = async () => {
        setLoading(true)
        setOutput("")

        const response = await fetch("http://localhost:3000/api/aichat/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: Message }),
        })

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
                            setOutput(prev => prev + data.content)
                        } catch (err) {
                            console.error("Failed to parse chunk:", err, line)
                        }
                    }
                }
            }
        }

        setLoading(false)
    }

    return (

        <div className="flex h-[calc(100%-40px)] flex-col w-full">
            <div className="h-[calc(100%-40px)] w-full overflow-y-auto">

            </div>
            <div className="p-[20px]">
                {Error && <p className="text-red-500">{Error}</p>}
                <p className="text-white whitespace-pre-wrap">{Output}</p>

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
