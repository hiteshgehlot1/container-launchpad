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

app.post('/container/start/:id', async (req, res) => {
    try{
        const container = docker.getContainer(req.params.id);
        await container.start();
        res.json({ message: 'Container started successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to start container" });
    }
});

app.post('/container/stop/:id', async (req, res) => {
    try{
        const container = docker.getContainer(req.params.id);
        await container.stop();
        res.json({ message: 'Container stopped successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to stop container" });
    }
});

app.post('/container/restart/:id', async (req, res) => {
    try{
        const container = docker.getContainer(req.params.id);
        await container.restart();
        res.json({ message: 'Container restarted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to restart container" });
    }
});

app.get('/container/logs/:id', async (req, res) => {
    try {
        const container = docker.getContainer(req.params.id);
        const logs = await container.logs({
            stdout: true,
            stderr: true,
            timestamps: true,
            tail: 100 // it will fetch the last 100 lines of logs
        });

        res.json(logs.toString());
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve container logs" });
    }
});

app.get("/container/stats/:id", async (req, res) => {
  try {
    const container = docker.getContainer(req.params.id);

    const stats = await container.stats({ stream: false });

    // CPU calculation
    let cpuUsage = 0;

    if (
      stats.precpu_stats &&
      stats.precpu_stats.cpu_usage &&
      stats.cpu_stats.system_cpu_usage
    ) {
      const cpuDelta =
        stats.cpu_stats.cpu_usage.total_usage -
        stats.precpu_stats.cpu_usage.total_usage;

      const systemDelta =
        stats.cpu_stats.system_cpu_usage -
        stats.precpu_stats.system_cpu_usage;

      if (systemDelta > 0) {
        cpuUsage =
          (cpuDelta / systemDelta) *
          stats.cpu_stats.online_cpus *
          100;
      }
    }

    // Memory
    const memoryUsage = stats.memory_stats?.usage || 0;
    const memoryLimit = stats.memory_stats?.limit || 0;

    res.json({
      cpu: cpuUsage.toFixed(2),
      memoryUsed: (memoryUsage / 1024 / 1024).toFixed(2),
      memoryLimit: (memoryLimit / 1024 / 1024).toFixed(2),
    });

  } catch (error) {
    console.error("Stats Error:", error.message);
    res.status(500).json({ error: "Failed to retrieve container stats" });
  }
});

app.get("/", (req, res) => {
  res.send("SecureScope API is running 🚀");
});

const PORT = 5000;
app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is running on port: http://localhost:${PORT}/health`);
});