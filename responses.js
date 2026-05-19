const responses = {

    greeting: [
        "Hola amigo",
        "Hola ¿cómo estás?",
        "Buenas amigo"
    ],

    goodbye: [
        "Adiós amigo",
        "Hasta luego",
        "Nos vemos pronto"
    ],

    thanks: [
        "De nada",
        "Con mucho gusto"
    ],

    unknown: [
        "No entiendo",
        "¿Puedes repetir?",
        "Explícate mejor"
    ]
};

function getRandomResponse(intent) {

    const possibleResponses = responses[intent];

    const randomIndex =
        Math.floor(Math.random() * possibleResponses.length);

    return possibleResponses[randomIndex];
}

module.exports = getRandomResponse;