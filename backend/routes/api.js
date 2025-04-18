const express = require("express");
const router = express.Router();
const { getDivinationResult, askIfaChatbot } = require("../controllers/controller");

// Example routes
router.post("/divination", getDivinationResult);
router.post("/chat", askIfaChatbot);

module.exports = router;
