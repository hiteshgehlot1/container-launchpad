import axios from "axios";

function ContainerCard({ container, refresh }) {
  const isRunning = container.state === "running";

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
      </div>
    </div>
  );
}

export default ContainerCard;