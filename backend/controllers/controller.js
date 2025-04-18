const { getIfaMessage, getChatResponse } = require("../utils/helpers");

const getDivinationResult = (req, res) => {
    const { odu, orientation, specificOrientation, solution, detail } = req.body;
    const message = getIfaMessage(odu, orientation, specificOrientation, solution, detail);
    res.json({ message });
};

const askIfaChatbot = (req, res) => {
    const { userInput } = req.body;
    const response = getChatResponse(userInput);
    res.json({ response });
};

module.exports = { getDivinationResult, askIfaChatbot };
