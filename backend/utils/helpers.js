const { oduMessages, ifaKnowledgeBase } = require("../data/oduData");

const getIfaMessage = (odu, orientation, specificOrientation, solution, detail) => {
    // Sample implementation, match this with how your frontend generates messages
    const result = oduMessages[odu]?.[orientation]?.[specificOrientation]?.[solution]?.[detail];
    return result || "Message not found for the selected combination.";
};

const getChatResponse = (input) => {
    input = input.toLowerCase();
    for (let key in ifaKnowledgeBase) {
        const keywords = key.split(",").map(k => k.trim());
        for (let word of keywords) {
            if (input.includes(word)) return ifaKnowledgeBase[key];
        }
    }
    return "I'm not sure how to answer that. Would you like me to update my knowledge?";
};

module.exports = { getIfaMessage, getChatResponse };
