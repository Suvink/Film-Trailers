import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:4000/");

const Socket = () => {
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);

      socket.on("message", (data) => {
        console.log("Received message:", data);
        setFooEvents((prevEvents) => [...prevEvents, data]);
      });

      socket.on("remove", (data) => {
        setFooEvents((prevEvents) =>
          prevEvents.filter((event) => event !== data)
        );
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const send = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div>
      <h1>Chat Page!</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter Input..."
      />
      <button onClick={send} disabled={!isConnected}>
        Send
      </button>
      <ul>
        {fooEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}{" "}
      </ul>
    </div>
  );
};

export default Socket;
