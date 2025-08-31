"use client"

import React, { useState, useEffect, useRef } from "react"

interface MessageData {
  Message: string;
  Type: string;
  Time?: string;
}

interface Character {
  name: string;
  description: string;
  active: boolean;
}

export default function Chat() {
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [output, setOutput] = useState<string>("")
  const [error, setError] = useState<string>("")
  const [chatData, setChatData] = useState<MessageData[]>([
    {
      Message: "Hello! I'm your AI assistant. How can I help you today?",
      Type: "bot",
      Time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true)
  const [currentCharacter, setCurrentCharacter] = useState<string>("Takora AI")
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatMessagesRef = useRef<HTMLDivElement>(null)

  const characters: Character[] = [
    { name: "Einstein", description: "Physics discussion", active: false },
    { name: "Sherlock", description: "Mystery solving", active: true },
    { name: "Tesla", description: "Energy innovation", active: false },
    { name: "Da Vinci", description: "Art and design", active: false },
    { name: "Takora AI", description: "General assistant", active: false }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [chatData, output])

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }

  const handleSendData = async () => {
    if (!message.trim()) return
    
    setLoading(true)
    setOutput("")
    let finalMessage = ""
    
    // Add user message to chat
    const userMessageData: MessageData = {
      Message: message,
      Type: "user",
      Time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setChatData(prev => [...prev, userMessageData])
    setMessage("")
    
    try {
      const response = await fetch("http://localhost:3000/api/aichat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      })

      if (!response.ok) {
        throw new Error("An error occurred!")
      }

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
              finalMessage += data.content
              setOutput(prev => prev + data.content)
            } catch (err) {
              console.error("Failed to parse chunk:", err, line)
            }
          }
        }
      }
      
      // Add AI response to chat
      const aiMessageData: MessageData = {
        Message: finalMessage,
        Type: "bot",
        Time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      
      setChatData(prev => [...prev, aiMessageData])
      setOutput("")

      // Post message to history
      const postMessage = await fetch(`http://localhost:3000/api/postmessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: message, ai: finalMessage }),
      })
      
      if (!postMessage.ok) {
        throw new Error("Failed to save message history")
      }
      
    } catch (err) {
      setError("An error occurred!")
      setTimeout(() => setError(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendData()
    }
  }

  const sendSuggestion = (suggestion: string) => {
    setMessage(suggestion)
  }

  const selectCharacter = (character: string) => {
    setCurrentCharacter(character)
    setSidebarOpen(false)
    
    // Add a message when switching characters
    const botMessage: MessageData = {
      Message: `You are now chatting with ${character}. How can I help you?`,
      Type: "bot",
      Time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setChatData(prev => [...prev, botMessage])
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-gray-800 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Takora AI
          </h1>
          <p className="text-gray-400 mt-2 text-sm">How can I help you today?</p>
        </div>
        
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">NAVIGATION</h2>
          <div className="space-y-2">
            <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <i className="fas fa-plus-circle text-purple-400"></i>
              <span>Create</span>
            </button>
            <button className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <i className="fas fa-star text-yellow-400"></i>
              <span>Favorites</span>
            </button>
          </div>
        </div>
        
        <div className="p-5 flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">RECENT CHATS</h2>
          <div className="space-y-2">
            {characters.map((character, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg cursor-pointer transition-colors ${currentCharacter === character.name ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                onClick={() => selectCharacter(character.name)}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${character.active ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                  <span className="font-medium">{character.name}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1 ml-5">{character.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-5 border-t border-gray-700">
          <div className="bg-gray-700 p-3 rounded-lg">
            <h3 className="font-medium mb-2">How does this work?</h3>
            <p className="text-sm text-gray-300">Select a character to start chatting. Each character has unique expertise and personality.</p>
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <button 
              className="p-2 rounded-lg hover:bg-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-bold">{currentCharacter}</h3>
              <p className="text-sm text-gray-400">Online</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <i className="fas fa-phone"></i>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div 
          ref={chatMessagesRef}
          className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800"
        >
          {chatData.map((messageData, index) => (
            <div 
              key={index} 
              className={`flex ${messageData.Type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[70%] rounded-xl p-4 ${messageData.Type === "user" ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gray-700"}`}>
                <p>{messageData.Message}</p>
                <div className="text-xs opacity-70 mt-1">{messageData.Time}</div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-xl p-4 inline-flex items-center">
                <div className="flex space-x-1 mr-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          )}
          
          {output.trim() !== "" && (
            <div className="flex justify-start">
              <div className="bg-gray-700 rounded-xl p-4 max-w-[70%]">
                <p>{output}</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-start">
              <div className="bg-red-900 rounded-xl p-4 max-w-[70%]">
                <p className="text-red-200">{error}</p>
              </div>
            </div>
          )}
          
          {chatData.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-4">
              <div 
                className="bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 text-sm cursor-pointer transition-colors"
                onClick={() => sendSuggestion('What can you do?')}
              >
                What can you do?
              </div>
              <div 
                className="bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 text-sm cursor-pointer transition-colors"
                onClick={() => sendSuggestion('Tell me a joke')}
              >
                Tell me a joke
              </div>
              <div 
                className="bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 text-sm cursor-pointer transition-colors"
                onClick={() => sendSuggestion('How does this work?')}
              >
                How does this work?
              </div>
            </div>
          )}
        </div>
        
        {/* Chat Input */}
        <div className="bg-gray-800 p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-lg hover:bg-gray-700">
              <i className="fas fa-plus"></i>
            </button>
            <div className="flex-1 relative">
              <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..." 
                className="w-full bg-gray-700 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-purple-400">
                <i className="fas fa-smile"></i>
              </button>
            </div>
            <button 
              onClick={handleSendData}
              disabled={loading || !message.trim()}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}