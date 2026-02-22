import { useEffect, useState } from "react";
import axios from "axios";
import ContainerCard from "./components/ContainerCard";

function App() {
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchContainers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/containers");
      setContainers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching containers:", error);
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Container Launchpad </h1>
      <h2>Docker Containers</h2>

      {loading ? (
        <p>Loading containers...</p>
      ) : containers.length === 0 ? (
        <p>No containers found.</p>
      ) : (
        containers.map(container => (
          <ContainerCard key={container.id} container={container} />
        ))
      )}
    </div>
  );
}

export default App;