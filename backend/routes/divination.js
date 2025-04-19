const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST /api/divination/log
router.post('/log', (req, res) => {
    const logPath = path.join(__dirname, '..', 'logs', 'divinationLogs.json');

    const entry = {
        ...req.body,
        timestamp: new Date().toISOString()
    };

    let logs = [];
    if (fs.existsSync(logPath)) {
        logs = JSON.parse(fs.readFileSync(logPath));
    }

    logs.push(entry);
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));

    res.json({ success: true });
});

module.exports = router;
