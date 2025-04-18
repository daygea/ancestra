// routes/numerology.js

const express = require("express");
const router = express.Router();
const {
  calculateNumerology,
  getNumerologyByNumber, // Add this
} = require("../controllers/numerologyController");

router.post("/", calculateNumerology);
router.get("/:number", getNumerologyByNumber); // Add this line

module.exports = router;