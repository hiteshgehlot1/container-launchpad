import { useState, useEffect } from "react";
import axios from "axios";


function ContainerCard({ container, refresh }) {
  const [logs, setLogs] = useState("");
  const [showLogs, setShowLogs] = useState(false);
  const [stats, setStats] = useState(null);

  const isRunning = container.state === "running";

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action) => {
    try {
      await axios.post(
        `http://localhost:5000/container/${action}/${container.id}`
      );
      refresh();
    } catch (error) {
      console.error(`Failed to ${action} container`, error);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/container/logs/${container.id}`
      );
      setLogs(res.data);
      setShowLogs(true);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    }
  };

  const fetchStats = async () => {
  try {
    const res = await axios.get(
      `http://localhost:5000/container/stats/${container.id}`
    );
    setStats(res.data);
  } catch (error) {
    console.error("Failed to fetch stats", error);
  }
};



  return (
    <div style={{
      color: "#fff",
      border: "1px solid #ddd",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "15px",
      backgroundColor: "#212121"
    }}>
      <h3>{container.name}</h3>
      <p><strong>Image:</strong> {container.image}</p>

      {stats && (
        <div style={{ marginTop: "10px" }}>
          <p><strong>CPU Usage:</strong> {stats.cpu}%</p>
          <p>
            <strong>Memory:</strong> {stats.memoryUsed} MB / {stats.memoryLimit} MB
          </p>
        </div>
      )}

      <p>
        <strong>Status:</strong>{" "}
        <span style={{
          color: isRunning ? "green" : "red",
          fontWeight: "bold"
        }}>
          {container.status}
        </span>
      </p>

      <div style={{ marginTop: "10px" }}>
        {!isRunning && (
          <button onClick={() => handleAction("start")}>
            Start
          </button>
        )}

        {isRunning && (
          <button onClick={() => handleAction("stop")}>
            Stop
          </button>
        )}

        <button
          onClick={() => handleAction("restart")}
          style={{ marginLeft: "10px" }}
        >
          Restart
        </button>

        <button
          onClick={fetchLogs}
          style={{ marginLeft: "10px" }}
        >
          View Logs
        </button>

        {showLogs && (
          <div style={{
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
            marginTop: "15px",
            backgroundColor: "#5c0000",
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarColor: "#ffff transparent",
            scrollbarGutter: "stable"
          }}>
            <pre style={{ whiteSpace: "pre-wrap", color: "#fff" }}>{logs}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContainerCard;