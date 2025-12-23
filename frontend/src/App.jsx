import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinRoom from "./components/JoinRoom";
import FirstPage from "./components/FirstPage";
import CreateRoom from "./components/CreateRoom";
import GameRoom from "./components/GameRoom";
import { SocketProvider } from "./SocketContext";

function App() {
  return (
    <div>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/join-room" element={<JoinRoom />} />
            <Route path="/create-room" element={<CreateRoom />} />
            <Route path="/play/:gameId" element={<GameRoom />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
