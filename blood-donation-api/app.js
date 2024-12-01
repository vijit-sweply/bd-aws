const express = require('express');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({ origin: "*" }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use((req, res, next) => {
    if (req.method !== 'OPTIONS') {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    }
    next();
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
