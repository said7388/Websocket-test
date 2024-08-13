import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

const socket = io("http://localhost:5000", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFidXNhaWQ3Mzg4QGdtYWlsLmNvbSIsImlkIjoyLCJyb2xlIjoic2NyaWJlciIsImlhdCI6MTcyMzQ0MjU1OCwiZXhwIjoxNzI0MDQ3MzU4fQ.Lk2qNGrOT88NkpUS4V4opOJ_0dG0wHp1t9M8XbS-UC8",
  },
});

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);

  const handleConnect = () => {
    const payload = {
      roomId: 1,
      scriberId: 1,
      role: "primary"
    };

    socket.emit('connectScriber', payload, (response) => {
      console.log(response)
    });
  };

  const handleDisconnect = () => {
    const payload = {
      roomId: 1,
      scriberId: 1,
      role: "primary"
    };

    socket.emit('disconnectScriber', payload, (response) => {
      console.log(response)
    });
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log("first connection")
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connected-scriber-1', (res) => {
      console.log(res, "res ffff")
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error); // This will log: "WebSocket error: Primary subscriber is already connected!"
    })

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('events');
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleConnect}>
          Connect
        </button>
        <button onClick={handleDisconnect}>
          Disconnect
        </button>
        <p>
          {isConnected ? "Connected" : "Disconnected"}
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
