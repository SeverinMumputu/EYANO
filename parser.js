const intents = require("./intents");

function detectIntent(message) {

    const lowerMessage = message.toLowerCase();

    for (const intent in intents) {

        const keywords = intents[intent];

        for (const word of keywords) {

            if (lowerMessage.includes(word)) {
                return intent;
            }
        }
    }

    return "unknown";
}

module.exports = detectIntent;