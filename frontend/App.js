// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const sendMessage = async () => {
//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/chat",
//         { message },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setResponse(res.data.response);
//     } catch (error) {
//       console.error("Error:", error);
//       setResponse("Error getting response from AI.");
//     }
//   };

//   return (
//     <div className="chat-container">
//       <h1>AI Chatbot (Qwen 2.5)</h1>

//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message..."
//       />

//       <button onClick={sendMessage}>Send</button>

//       <div className="response">{response}</div>
//     </div>
//   );
// }

// export default App;





import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      );

      const botMessage = {
        sender: "bot",
        text: res.data.response,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "❌ Error getting response from AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <div className="chat-box">
        <div className="chat-header">
          🤖 Qwen 2.5 Chatbot
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="message bot typing">
              Qwen is typing...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} disabled={loading}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
