import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "AIzaSyDDMn6NzpggzWUTv9XdwV6LB7wjGFMoC5E"; 

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");

    try {
      const result = await model.generateContent(input);
      const response =  result.response;
      const botMessage = { role: "assistant", content: response.text() };

      setMessages([...updatedMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    }

    setLoading(false);
  };

  return (
   <> <div className=" mx-auto p-4 h-screen bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-3">🤖 Gemini AI Assistant</h2>
      <div className="max-h-[75vh] overflow-y-auto border p-3 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.role === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
            <strong>{msg.role === "user" ? "You: " : "Gemini: "}</strong> {msg.content}
          </div>
        ))}
        {loading && <p className="text-gray-500">Gemini is thinking...</p>}
      </div>
      <div className="mt-3 flex">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."P
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">
          Send
        </button>
      </div>
    </div></>
  );
};

export default Chatbot;