function ContainerCard({ container}) {
    const isRunning = container.state === 'running';
    return (
        <div style={{
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
        </div>
    );
}
export default ContainerCard;