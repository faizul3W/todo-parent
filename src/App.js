import "./App.css";
import React, { useRef, useEffect, useState } from "react";

function App() {
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState("");

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      "Hello son!",
      "http://localhost:3000"
    );
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
      setRecievedMessage("Got this message from child: " + e.data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Parent iFrame</h1>
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        Send message to child
      </button>

      <iframe
        ref={iFrameRef}
        src="http://localhost:3000/"
        width="600"
        height="300"
        title="Child iframe"
      ></iframe>

      <p>{recievedMessage}</p>
    </div>
  );
}

export default App;
