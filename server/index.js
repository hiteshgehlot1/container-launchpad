const Docker = require('dockerode');
const express = require('express');
const cors = require('cors');
const app = express();

const docker = new Docker(
    {
        socketPath: "//./pipe/docker_engine"
    }
);

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok! Server is running!' });
});

app.get('/containers', async (req, res) => {
    try {
        const containers = await docker.listContainers({all: true});
        const formatted = containers.map(container => ({
            id: container.Id,
            name: container.Names[0].replace("/", ""),
            image: container.Image,
            status: container.Status,
            state: container.State,
        }));
        res.json(formatted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch containers' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}/health`);
});