import React from "react";

export default function ChatBubble({ message }) {
  const isUser = message.sender === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`p-3 rounded-xl max-w-[70%] ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-800 text-white"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
