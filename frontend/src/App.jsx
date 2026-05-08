import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/index.php")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Minecraft Server</h1>

      {data ? (
        <div className="bg-gray-800 p-5 rounded-lg">
          <p>Server: {data.server_name}</p>
          <p>Status: {data.online ? "Online" : "Offline"}</p>
          <p>Players: {data.players}/{data.max_players}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}