import { useNavigate } from "react-router-dom";

function FirstPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-700 flex flex-col items-center justify-center gap-5">
      <button
        className="bg-orange-400 px-5 py-2 rounded-lg font-semibold shadow-[0_0_0_3px] hover:scale-[1.05] duration-300 cursor-pointer"
        onClick={() => {navigate("/join-room")}}
      >
        Join room
      </button>
      <button className="bg-orange-400 px-5 py-2 rounded-lg font-semibold shadow-[0_0_0_3px] hover:scale-[1.05] duration-300 cursor-pointer" onClick={()=>{navigate("/create-room")}}>
        Create room
      </button>
    </div>
  );
}

export default FirstPage;
