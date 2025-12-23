import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/chat",
        { message },
        { headers: { "Content-Type": "application/json" } }
      );
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error getting response from AI.");
    }
  };

  return (
    <div className="chat-container">
      <h1>AI Chatbot (Qwen 2.5)</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />

      <button onClick={sendMessage}>Send</button>

      <div className="response">{response}</div>
    </div>
  );
}

export default App;




