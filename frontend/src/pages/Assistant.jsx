import React, { useEffect, useRef, useState } from "react";
import ConversationList from "../components/assistant/ConversationList";
import ChatBubble from "../components/assistant/ChatBubble";
import useLocalStorage from "../utils/useLocalStorage";
import { FiSend } from "react-icons/fi";

export default function Assistant() {
  const [messages, setMessages] = useLocalStorage("assistant-messages", []);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    const aiResponse = {
      id: Date.now() + 1,
      text: `AI: ${input.split("").reverse().join("")}`, // simple mock AI
      sender: "ai",
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
    }, 800);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="p-6 flex flex-col h-full min-h-[calc(100vh-80px)] text-white">
      <h1 className="text-3xl font-bold mb-6">AI Assistant</h1>

      <div className="flex-1 overflow-y-auto mb-4 space-y-2 bg-gray-900 p-4 rounded-xl">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-3 rounded-xl bg-gray-800 placeholder-gray-400 text-white focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-blue-500 p-3 rounded-xl hover:bg-blue-600 transition"
          onClick={handleSend}
        >
          <FiSend size={24} />
        </button>
      </div>
    </div>
  );
}
