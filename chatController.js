const detectIntent = require("./parser");
const getRandomResponse = require("./responses");

function chatController(req, res) {

    const userMessage = req.body.message;

    const intent = detectIntent(userMessage);

    const response = getRandomResponse(intent);

    res.json({
        intent,
        response
    });
}

module.exports = chatController;