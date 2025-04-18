// controllers/numerologyController.js

const {
    getNumerologyNumber,
    getNameNumerology,
    getZodiacSign,
    summaryNumerologyMeanings,
    numerologyMeanings,
    planetaryTransits
} = require("../utils/numerologyUtils");

exports.calculateNumerology = (req, res) => {
    const { fullname, birthdate } = req.body;

    if (!fullname || !birthdate) {
        return res.status(400).json({ error: "fullname and birthdate are required." });
    }

    const nameDetails = getNameNumerology(fullname);
    const birthDateObj = new Date(birthdate);

    const birthDay = birthDateObj.getDate();
    const birthMonth = birthDateObj.getMonth() + 1;
    const birthYear = birthDateObj.getFullYear();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    const currentWeek = Math.ceil((currentDay + new Date(currentYear, currentMonth - 1, 1).getDay()) / 7);

    const result = {
        fullname,
        birthdate,
        destiny: {
            number: nameDetails.destiny,
            label: summaryNumerologyMeanings[nameDetails.destiny],
            meaning: numerologyMeanings[nameDetails.destiny]
        },
        soulUrge: {
            number: nameDetails.soulUrge,
            label: summaryNumerologyMeanings[nameDetails.soulUrge],
            meaning: numerologyMeanings[nameDetails.soulUrge]
        },
        quiescent: {
            number: nameDetails.quiescent,
            label: summaryNumerologyMeanings[nameDetails.quiescent],
            meaning: numerologyMeanings[nameDetails.quiescent]
        },
        vibrations: {
            day: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentDay}`)],
            week: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentWeek}`)],
            month: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}`)],
            year: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}`)],
            lifetime: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)]
        },
        astrology: getZodiacSign(birthdate)
    };

    // Enrich with planetary wisdom (optional)
    const planet = result.astrology?.ruler;
    if (planet && planetaryTransits[planet]) {
        result.planetaryWisdom = planetaryTransits[planet];
    }

    res.json(result);
};

// New controller function to fetch numerology data based on number

exports.getNumerologyByNumber = (req, res) => {
  const number = req.params.number;

  if (!summaryNumerologyMeanings[number] || !numerologyMeanings[number]) {
    return res.status(404).json({ error: "Numerology number not found" });
  }

  const result = {
    number,
    label: summaryNumerologyMeanings[number],
    meaning: numerologyMeanings[number],
  };

  res.json(result);
};

