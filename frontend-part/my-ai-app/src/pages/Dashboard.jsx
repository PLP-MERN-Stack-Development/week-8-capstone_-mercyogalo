import { useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import Demo from "../Mytypewriter";
import { Typewriter } from 'react-simple-typewriter';

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/chat",
        { query },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChats((prev) => [...prev, { query, response: res.data.response }]);
      setQuery(""); 

    } catch (error) {
      console.log(`The error is:${error}`);
    } finally {
      setLoading(false);
    }
  };

  const searchForm = (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="text"
        placeholder="Ask a question..."
        className="flex-1 px-4 py-2 border text-red-500 rounded border-4 border-sky-500/100 ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-sky-600 text-white px-6 py-2 rounded hover:bg-sky-700"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
    </form>
  );

  return (
  <div className="min-h-screen bg-gray-50 px-4 py-6">
    <Navbar />

    <div className="max-w-2xl mx-auto mt-10">
     
      {chats.length === 0 && <Demo />}

     
      {chats.map((chat, index) => (
        <div key={index}>
          <div className="chat chat-start">
            <div className="chat-bubble text-dark">{chat.query}</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble text-dark ">
                <Typewriter
                words={[chat.response]} // or response if from state
                loop={1}
                typeSpeed={40}
                deleteSpeed={0}
                cursor
                cursorStyle="|"
                />
              </div>
          </div>
        </div>
      ))}
      <div className="mt-6">{searchForm}</div>
    </div>
  </div>
);

}
