const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// POST /api/divination/log
router.post('/log', (req, res) => {

    const logFilePath = path.join(__dirname, "../logs/divinationLogs.json");

	// Ensure the logs directory exists
	if (!fs.existsSync(path.dirname(logFilePath))) {
	    fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
	}

	// Ensure the log file exists
	if (!fs.existsSync(logFilePath)) {
	    fs.writeFileSync(logFilePath, "[]");
	}

    const entry = {
        ...req.body,
        timestamp: new Date().toISOString()
    };

    let logs = [];
    if (fs.existsSync(logFilePath)) {
        logs = JSON.parse(fs.readFileSync(logFilePath));
    }

    logs.push(entry);
    fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));

    res.json({ success: true });
});

module.exports = router;
