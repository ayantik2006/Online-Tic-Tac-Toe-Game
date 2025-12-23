import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSocket} from "../SocketContext";

function JoinRoom() {
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("incorrect room id",(data)=>{
      alert(data.msg);
    });

    socket.on("room full",(data)=>{
      alert(data.msg);
    });

    socket.on("room joined", (data) => {
      navigate("/play/"+data.roomName+"?name="+data.name+"&role=friend");
    });
  }, [socket]);

  return (
    <div className="min-h-screen bg-red-700 flex flex-col items-center justify-center gap-5">
      <button
        className="bg-transparent px-5 py-2 rounded-lg font-semibold shadow-[0_0_0_3px] hover:scale-[1.05] duration-300 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Go back
      </button>

      <form
        className="flex flex-col items-center justify-center gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const name=e.currentTarget[0].value;
          const roomName=e.currentTarget[1].value;
          socket.emit("join room",{name:name,roomName:roomName});
        }}
      >
        <input
          type="text"
          required
          className="bg-red-500 h-[1.6rem] rounded-lg outline-none p-4 px-2 border-2"
          placeholder="Your name"
        />
        <input
          type="text"
          required
          className="bg-red-500 h-[1.6rem] rounded-lg outline-none p-4 px-2 border-2"
          placeholder="Room ID"
        />
        <button
          className="bg-orange-400 px-4 py-1 rounded-lg font-semibold shadow-[0_0_0_2px] hover:scale-[1.05] duration-300 cursor-pointer"
        >
          Play
        </button>
      </form>
    </div>
  );
}

export default JoinRoom;
