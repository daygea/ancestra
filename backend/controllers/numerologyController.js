// controllers/numerologyController.js

const {
    reduceNumber,
    getNumerologyNumber,
    getNameNumerology,
    getZodiacSign,
    summaryNumerologyMeanings,
    numerologyMeanings,
    getBirthdayChallenge,
    getBirthdayGift,
    birthdayChallengeMeanings,
    birthdayGiftMeanings,
    astrologyData,
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

    const birthdayChallengeNumber = getBirthdayChallenge(birthDay);
    const birthdayGiftNumber = getBirthdayGift(birthDay);
    summaryNumerologyMeanings[0] = "Potential energy or spiritual void. A call to awakening.";

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
        birthdayChallenge: {
            number: birthdayChallengeNumber,
            label: summaryNumerologyMeanings[birthdayChallengeNumber],
            meaning: birthdayChallengeMeanings[birthdayChallengeNumber]
        },
        birthdayGift: {
            number: birthdayGiftNumber,
            label: summaryNumerologyMeanings[birthdayGiftNumber],
            meaning: birthdayGiftMeanings[birthdayGiftNumber]
        },
        vibrations: {
            day: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentDay}`), 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentDay}`)],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentDay}`)]
            },
            week: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentWeek}`), 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentWeek}`)],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}${currentWeek}`)]
            },
            month: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}`), 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}`)],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}${currentMonth}`)]
            },
            year: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}`), 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}`)],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${currentYear}`)]
            },
            lifepath: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`), 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)]
            },
            previouslifepath: {
                number: getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)-1, 
                label: summaryNumerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)-1],
                meaning: numerologyMeanings[getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)-1]
            },
            reality: {
                number: reduceNumber(getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)+nameDetails.destiny), 
                label: summaryNumerologyMeanings[reduceNumber(getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)+nameDetails.destiny)],
                meaning: numerologyMeanings[reduceNumber(getNumerologyNumber(`${birthDay}${birthMonth}${birthYear}`)+nameDetails.destiny)]
            }
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

