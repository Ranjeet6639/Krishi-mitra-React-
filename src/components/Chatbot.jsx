import React, { useState } from "react";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = (text) => {
    if (!text) return;

    setMessages([...messages, { sender: "user", text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🌾 Krishi AI: I am here to help you!" }
      ]);
    }, 1000);
  };

  return (
    <>
      <button id="chatbot-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {open && (
        <div id="chatbot-window">
          <div id="chat-header">Krishi Mitra AI</div>

          <div id="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "user" ? "msg-user" : "msg-bot"}>
                {msg.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Type message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      )}
    </>
  );
}

export default Chatbot;
