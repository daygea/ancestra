// routes/configRoutes.js
const express = require("express");
const router = express.Router();

// Define free Odus (can be moved later to a separate JSON if needed)
const freeOdus = [
    "Ejiogbe", 
    "Oyeku Meji", 
    "Iwori Meji", 
    "Idi Meji", 
    "Irosun Ika", 
    "Owonrin Ogunda",
    "Owonrin Ose", 
    "Osa Ogbe", 
    "Osa Owonrin",
    "Irete Ose",
    "Ose Otura"
];

// API Endpoint to fetch freeOdus
router.get('/free-odus', (req, res) => {
    res.json({ freeOdus });
});

module.exports = router;
