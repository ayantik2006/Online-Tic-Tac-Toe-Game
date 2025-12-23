import { useNavigate } from "react-router-dom"; 
import { nanoid } from "nanoid";

function CreateRoom() {
  const navigate=useNavigate();

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
          const gameId = nanoid(6);
          navigate("/play/"+gameId+"?name="+name);
        }}
      >
        <input
          type="text"
          required
          className="bg-red-500 h-[1.6rem] rounded-lg outline-none p-4 px-2 border-2"
          placeholder="Your name"
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

export default CreateRoom;
