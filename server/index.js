const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok! Server is running!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}/health`);
});