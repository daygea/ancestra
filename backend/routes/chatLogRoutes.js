// routes/chatLogRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../logs/chatLog.json');

if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, JSON.stringify([]));
}

router.post('/log', (req, res) => {
  const { userMessage, botResponse } = req.body;
  const entry = {
    userMessage,
    botResponse,
    timestamp: new Date().toISOString()
  };

  const logData = JSON.parse(fs.readFileSync(logFile));
  logData.push(entry);
  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));

  res.json({ success: true });
});

module.exports = router;
