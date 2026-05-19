const playBtn =
    document.getElementById("playBtn");

const stopBtn =
    document.getElementById("stopBtn");

const playIcon =
    document.getElementById("playIcon");

const statusText =
    document.getElementById("statusText");

const userAvatar =
    document.getElementById("userAvatar");

const eyanoAvatar =
    document.getElementById("eyanoAvatar");

/* ETAT */

let isRunning = false;

/* SPEECH RECOGNITION */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition =
    new SpeechRecognition();

recognition.lang = "es-ES";

recognition.continuous = false;

recognition.interimResults = false;

/* PLAY / PAUSE */

playBtn.addEventListener("click", () => {

    if (!isRunning) {

        isRunning = true;

        startConversation();

        playIcon.innerHTML = `
            <rect
                x="6"
                y="4"
                width="4"
                height="16"
                rx="1"
                fill="white"/>

            <rect
                x="14"
                y="4"
                width="4"
                height="16"
                rx="1"
                fill="white"/>
        `;

    } else {

        isRunning = false;

        recognition.stop();

        speechSynthesis.pause();

        playIcon.innerHTML = `
            <polygon
                points="5 3 19 12 5 21 5 3"/>
        `;

        statusText.innerText =
            "Conversation en pause";
    }
});

/* STOP */

stopBtn.addEventListener("click", () => {

    isRunning = false;

    recognition.stop();

    speechSynthesis.cancel();

    playIcon.innerHTML = `
        <polygon
            points="5 3 19 12 5 21 5 3"/>
    `;

    resetAvatars();

    statusText.innerText =
        "Conversation arrêtée";
});

/* START */

function startConversation() {

    activateUser();

    statusText.innerText =
        "Parlez maintenant...";

    recognition.start();
}

/* USER SPEAKS */

recognition.onresult =
    async function(event) {

    const transcript =
        event.results[0][0].transcript;

    activateEyano();

    statusText.innerText =
        "EYANO réfléchit...";

    const response =
        await fetch(
            "http://localhost:3000/chat",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message: transcript
                })
            }
        );

    const data =
        await response.json();

    speak(data.response);
};

/* EYANO SPEAKS */

function speak(text) {

    const utterance =
        new SpeechSynthesisUtterance(text);

    utterance.lang = "es-ES";

    utterance.rate = 0.95;

    utterance.pitch = 1;

    utterance.onend = () => {

        if (isRunning) {

            activateUser();

            statusText.innerText =
                "Votre tour de parler";

            recognition.start();
        }
    };

    speechSynthesis.speak(utterance);
}

/* AVATARS */

function activateUser() {

    userAvatar.classList.add("active-user");

    eyanoAvatar.classList.remove("active-eyano");
}

function activateEyano() {

    eyanoAvatar.classList.add("active-eyano");

    userAvatar.classList.remove("active-user");
}

function resetAvatars() {

    userAvatar.classList.remove("active-user");

    eyanoAvatar.classList.remove("active-eyano");
}