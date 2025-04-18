const express = require("express");
const router = express.Router();
const oduData = require("../data/oduData");

// Example endpoint: /api/odu/Ofun Ose
router.get("/:name", (req, res) => {
    const oduName = req.params.name;
    const oduInfo = oduData[oduName];

    if (oduInfo) {
        res.json(oduInfo);
    } else {
        res.status(404).json({ error: "Odu not found" });
    }
});

// Fetch message data for specific Odu combination
router.get("/messages/:mainCast/:orientation/:specificOrientation/:solution/:specificSolution", (req, res) => {
    const { mainCast, orientation, specificOrientation, solution, specificSolution } = req.params;
    
    // Example: Fetch odu data from a data source like oduData
    const oduInfo = oduData[mainCast];
    
    if (oduInfo) {
        const orientationData = oduInfo[orientation];
        const specificOrientationData = orientationData ? orientationData[specificOrientation] : null;
        const solutionData = specificOrientationData ? specificOrientationData[solution] : null;
        const specificSolutionData = solutionData ? solutionData[specificSolution] : null;

        // Send back the data as a JSON response
        res.json({
            Message: specificOrientationData ? specificOrientationData.Message : "No message available",
            [solution]: {
                [specificSolution]: specificSolutionData || "No solution info available"
            },
            Messages: orientationData?.Messages || "No general message available for this orientation",
            specificOrientationMessage: specificOrientationData?.Message || "No message available for this specific orientation"
        });
    } else {
        res.status(404).json({ error: "Odu not found" });
    }
});

// Fetch specific orientations for a given Odu and orientation
router.get("/orientations/:mainCast/:orientation", (req, res) => {
    const { mainCast, orientation } = req.params;
    
    const oduInfo = oduData[mainCast];
    
    if (oduInfo) {
        const orientationData = oduInfo[orientation];
        
        if (orientationData) {
            const specificOrientations = Object.keys(orientationData);
            res.json(orientationData);
        } else {
            res.status(404).json({ error: "Orientation not found" });
        }
    } else {
        res.status(404).json({ error: "Odu not found" });
    }
});

// Fetch solution details for a given Odu and solution
router.get("/solutionDetails/:mainCast/:solution", (req, res) => {
    const { mainCast, solution } = req.params;
    
    const oduInfo = oduData[mainCast];
    
    if (oduInfo) {
        const solutionData = oduInfo.Solution?.[solution];
        
        if (solutionData) {
            res.json(solutionData);
        } else {
            res.status(404).json({ error: "Solution details not found" });
        }
    } else {
        res.status(404).json({ error: "Odu not found" });
    }
});

// Sample data for paid Odus (this would be retrieved from your database or session)
const paidOdus = {};

// Check if an Odu is available based on the payment and expiration time
router.get("/checkPayment/:oduName/:orientation/:specificOrientation/:solution/:solutionDetails", (req, res) => {
    const { oduName, orientation, specificOrientation, solution, solutionDetails } = req.params;
    const combinationKey = `${oduName}-${orientation}-${specificOrientation}-${solution}-${solutionDetails}`;
    const oduExpirationTime = paidOdus[combinationKey];

    if (oduExpirationTime && Date.now() < oduExpirationTime) {
        res.json({ accessGranted: true });
    } else if (req.user.isAdmin) {  // Admins always have access
        res.json({ accessGranted: true });
    } else {
        res.json({ accessGranted: false });
    }
});

module.exports = router;
