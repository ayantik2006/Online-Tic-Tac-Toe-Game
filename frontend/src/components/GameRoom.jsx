import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSocket } from "../SocketContext";

function GameRoom() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const gameId = params.gameId;
  const name = searchParams.get("name");
  const role = searchParams.get("role");
  const socket = useSocket();
  const [players, setPlayers] = useState([]);
  const symbol = role === "friend" ? "O" : "X";
  const [boxValues, setBoxValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isMyTurn, setIsMyTurn] = useState(!(role === "friend"));
  const navigate = useNavigate();
  const [isCopied,setIsCopied]=useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.emit("create room", { name: name, roomName: gameId });

    socket.on("room joined", (data) => {
      setPlayers([data.player1, data.player2]);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on("player moved", (data) => {
      setBoxValues((prev) => {
        const next = [...prev];
        next[data.key] = data.symbol;
        return next;
      });
      setIsMyTurn(data.symbol !== symbol);
    });
  }, [socket, symbol]);

  useEffect(() => {
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of wins) {
      if (
        boxValues[a] &&
        boxValues[a] === boxValues[b] &&
        boxValues[a] === boxValues[c]
      ) {
        setIsMyTurn(false);
        alert(`${boxValues[a]} is the winner!`);
        return;
      }
    }
  }, [boxValues]);
  
  return (
    <div className="min-h-screen bg-red-700 flex items-center justify-center gap-15 flex-wrap">
      <div className="border-3 p-5 flex flex-col gap-3">
        <h1 className="text-3xl flex items-center">Players </h1>
        <h2
          className="border-1 px-3 cursor-pointer"
          onClick={(e) => {
            navigator.clipboard.writeText(gameId)
            setIsCopied(true);
            setTimeout(() => {
              setIsCopied(false);
            }, 3000);
          }}
        >
          {isCopied?"Copied!":"Copy room code"}
        </h2>
        <div className="flex flex-col gap-2">
          {players.map((playerName, index) => {
            return (
              <div className="text-2xl" key={index}>
                {playerName}
              </div>
            );
          })}
        </div>
        <div className="flex items-center text-xl items-center justify-center border-3 bg-[#D68888] font-bold px-2">
          {isMyTurn ? "Your turn" : "Opponent's turn"}
        </div>
      </div>

      {players[1] && (
        <div className="flex flex-col flex-wrap w-[15rem] h-[15rem] gap-1">
          <div className="flex  gap-1 flex-1">
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[0] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[0] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 0,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[0]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[1] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[1] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 1,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[1]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[2] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[2] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 2,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[2]}
            </div>
          </div>
          <div className="flex gap-1  flex-1">
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[3] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[3] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 3,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[3]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[4] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[4] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 4,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[4]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[5] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[5] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 5,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[5]}
            </div>
          </div>
          <div className="flex gap-1  flex-1">
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[6] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[6] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 6,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[6]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[7] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[7] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 7,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[7]}
            </div>
            <div
              className={`flex-1 bg-red-300 rounded-2xl border-3 hover:opacity-80 cursor-pointer flex items-center justify-center text-5xl ${
                boxValues[8] === ""
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                isMyTurn
                  ? ""
                  : "pointer-events-none hover:bg-red-400 bg-red-400"
              } ${
                players[1] === ""
                  ? "pointer-events-none hover:bg-red-400 bg-red-400"
                  : ""
              }`}
              onClick={() => {
                let newBoxValues = [...boxValues];
                newBoxValues[8] = symbol;
                setBoxValues(newBoxValues);
                setIsMyTurn(false);
                socket.emit("player moved", {
                  key: 8,
                  symbol: symbol,
                  roomName: gameId,
                });
              }}
            >
              {boxValues[8]}
            </div>
          </div>
        </div>
      )}

      <div>
        <button
          className="bg-transparent px-5 py-2 rounded-lg font-semibold shadow-[0_0_0_3px] hover:scale-[1.05] duration-300 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Exit Game
        </button>
      </div>
    </div>
  );
}

export default GameRoom;
