import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:8000");

    // Event listeners
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run the effect only once on mount

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const messageObject = {
        username,
        text: inputMessage,
      };

      // Emit a message event to the server
      Socket.emit("sendMessage", messageObject);

      // Update the local state with the sent message
      setMessages((prevMessages) => [...prevMessages, messageObject]);

      // Clear the input field
      setInputMessage("");
    }
  };

  return (
    <div>
      <h1>Chats Page</h1>
      <div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="messageInput">Message: </label>
          <input
            type="text"
            id="messageInput"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Chat Room</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.username}:</strong> {message.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
