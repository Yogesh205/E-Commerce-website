import React, { useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]); // Fixed: Corrected 'message' to 'messages'
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (input.trim() === "") return;

    setMessages([...messages, { text: input, sender: "user" }]); // Fixed: Corrected 'sendMessage' to 'setMessages'
    setInput("");
  };

  return ( // Fixed: Added parenthesis
    <div className="fixed bottom-6 right-6 flex flex-col items-end">
      {/* Chat Bubble Button */}
      <button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-gray-900 text-white w-80 h-96 rounded-lg shadow-lg p-4 mt-3 flex flex-col">
          <div className="flex-grow overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user" ? "bg-blue-500" : "bg-gray-700"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 rounded-l-lg bg-gray-800 text-white focus:outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 p-3 rounded-r-lg hover:bg-blue-700 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
