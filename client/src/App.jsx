import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/health")
      .then(res => setMessage(res.data.status))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Container Launchpad 🚀</h1>
      <p>Backend Status:</p>
      <strong>{message}</strong>
    </div>
  );
}

export default App;
