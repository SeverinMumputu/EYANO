
        /* =====================================================================
           ETAPE 1 & 3: LE MOTEUR LOGIQUE EYANO (Base de connaissances & Mémoire)
           ===================================================================== */
        class EyanoLogicEngine {
            constructor() {
                // Mémoire simple
                this.memory = {
                    userName: "",
                    lastTopic: "general",
                    state: "init" // init, ordering, interviewing, etc.
                };

                // Base de connaissance (Règles grammaticales et contextuelles déterministes)
                // pattern: expression régulière pour détecter l'intention
                // responses: tableau de réponses possibles pour rendre l'avatar plus naturel (random)
                this.knowledgeBase = {
                    general: [
                        { pattern: /hola|buenos d(í|i)as|buenas tardes|buenas noches/i, responses: ["¡Hola! ¿Cómo estás?", "¡Buenos días! ¿De qué te gustaría hablar?", "¡Saludos! ¿Qué tal tu día?"] },
                        { pattern: /c(o|ó)mo est(a|á)s|qu(e|é) tal/i, responses: ["Estoy muy bien, gracias por preguntar. ¿Y tú?", "Todo excelente. Listo para practicar español."] },
                        { pattern: /bien|genial|perfecto/i, responses: ["¡Me alegra escuchar eso! ¿De qué tema hablamos hoy?", "¡Qué bueno! La práctica constante es la clave."] },
                        { pattern: /me llamo (.+)|soy (.+)/i, extract: true, responses: ["¡Mucho gusto, [NAME]! Es un placer practicar contigo.", "¡Hola [NAME]! Tienes un nombre muy bonito."] },
                        { pattern: /adi(o|ó)s|chao|hasta luego|nos vemos/i, responses: ["¡Adiós! Hasta la próxima.", "¡Chao! Sigue practicando tu español.", "¡Nos vemos pronto!"] },
                        { pattern: /qu(e|é) eres|qui(e|é)n eres|c(o|ó)mo te llamas/i, responses: ["Soy Eyano, tu asistente virtual para practicar español.", "Me llamo Eyano. No soy humano, pero estoy programado para conversar contigo."] },
                        { pattern: /(gracias|te lo agradezco)/i, responses: ["¡De nada!", "Con mucho gusto.", "No hay de qué."] }
                    ],
                    restaurant: [
                        { pattern: /hola|buenos d(í|i)as/i, responses: ["¡Hola! Bienvenido al Restaurante Eyano. ¿Tiene una reserva?", "¡Buenas! ¿Mesa para cuántos?"] },
                        { pattern: /reserva|s(i|í)|mesa para/i, responses: ["Perfecto. Por favor, acompáñeme. ¿Le gustaría ver el menú?", "¡Claro! Sígame. Aquí tiene la carta."] },
                        { pattern: /men(u|ú)|carta|comer/i, responses: ["Hoy tenemos paella, tortilla de patatas y gazpacho. ¿Qué le apetece?", "De plato principal recomiendo la paella. ¿Qué le gustaría beber?"] },
                        { pattern: /paella|tortilla|gazpacho|pollo|carne|pescado/i, responses: ["Excelente elección. Es mi plato favorito. ¿Y para beber?", "Marchando. ¿Desea algo de tomar?"] },
                        { pattern: /agua|vino|cerveza|jugo|refresco|beber/i, responses: ["Enseguida se lo traigo. ¿Desea algún postre?", "Muy bien. Tomo nota."] },
                        { pattern: /postre|dulce|flan|helado/i, responses: ["¡Qué rico! Enseguida se lo sirvo.", "Buena elección para terminar la comida."] },
                        { pattern: /cuenta|pagar|cu(a|á)nto es/i, responses: ["Claro, aquí tiene la cuenta. Son veinticinco euros. ¿Efectivo o tarjeta?", "Enseguida. ¿Va a pagar con tarjeta?"] },
                        { pattern: /tarjeta|efectivo/i, responses: ["Perfecto, transacción aprobada. ¡Muchas gracias por su visita!", "Aquí tiene su cambio. ¡Que tenga un buen día!"] }
                    ],
                    travel: [
                        { pattern: /hola|buenos d(í|i)as/i, responses: ["¡Hola! Bienvenido a la agencia de viajes Eyano. ¿A dónde le gustaría viajar?", "¿Buenos días! ¿Busca billetes de avión o de tren?"] },
                        { pattern: /viajar a|ir a|billete para/i, responses: ["Ese es un destino increíble. ¿Para qué fechas?", "Excelente. ¿Cuántos días planea quedarse?"] },
                        { pattern: /d(i|í)as|semana|mes/i, responses: ["Perfecto. Le buscaré el mejor hotel. ¿Prefiere en el centro o cerca de la playa?", "Entendido. ¿Qué presupuesto aproximado tiene?"] },
                        { pattern: /centro|playa|barato|econ(o|ó)mico/i, responses: ["He encontrado una opción perfecta. Le envío los detalles. ¿Necesita alquilar un coche?", "Genial. Todo está reservado. ¡Disfrute de su viaje!"] },
                        { pattern: /aeropuerto|vuelo/i, responses: ["El vuelo sale a las diez de la mañana. No olvide su pasaporte.", "Su puerta de embarque es la número cinco."] }
                    ],
                    interview: [
                        { pattern: /hola|buenos d(í|i)as/i, responses: ["Buenos días. Bienvenido a la entrevista. Por favor, tome asiento. ¿Cómo está?", "Hola. Gracias por venir. ¿Comenzamos la entrevista?"] },
                        { pattern: /bien|listo|s(i|í)|comenzamos/i, responses: ["Muy bien. Cuénteme un poco sobre usted.", "Perfecto. ¿Cuál es su experiencia profesional?"] },
                        { pattern: /trabaj(e|é)|experiencia|soy/i, responses: ["Interesante. ¿Cuáles considera que son sus mayores fortalezas?", "Eso suena muy bien. ¿Por qué le interesa este puesto?"] },
                        { pattern: /fortaleza|responsable|aprender|puesto/i, responses: ["Excelente. ¿Y cuál diría que es su mayor debilidad?", "Comprendo. ¿Dónde se ve en cinco años?"] },
                        { pattern: /debilidad|cinco a(ñ|n)os|futuro/i, responses: ["Gracias por su honestidad. ¿Tiene alguna pregunta para mí?", "Me parece una buena respuesta. ¿Tiene dudas sobre la empresa?"] },
                        { pattern: /no|pregunta|empresa|sueldo/i, responses: ["Perfecto. Nosotros le llamaremos la próxima semana. ¡Gracias por venir!", "La entrevista ha terminado. Ha sido un placer conocerle."] }
                    ]
                };

                // Fallbacks pour les incompréhensions
                this.fallbacks = [
                    "Perdona, no te he entendido bien. ¿Puedes repetirlo?",
                    "Disculpa, no reconozco esa palabra. ¿Podrías decirlo de otra manera?",
                    "No estoy seguro de entenderte. ¿Seguimos hablando del tema?"
                ];
            }

            setTopic(topic) {
                if (this.knowledgeBase[topic]) {
                    this.memory.lastTopic = topic;
                    return true;
                }
                return false;
            }

            setUserName(name) {
                this.memory.userName = name;
            }

            // Moteur de traitement de texte (Sans IA, pur logique regex)
            processInput(text) {
                const topicRules = this.knowledgeBase[this.memory.lastTopic] || this.knowledgeBase.general;
                const generalRules = this.knowledgeBase.general;
                
                // On cherche d'abord dans le contexte actuel, puis en général
                let match = this.findMatch(text, topicRules);
                if (!match && this.memory.lastTopic !== "general") {
                    match = this.findMatch(text, generalRules);
                }

                if (match) {
                    let response = match.responses[Math.floor(Math.random() * match.responses.length)];
                    
                    // Gestion de la mémoire (extraction de nom)
                    if (match.extract) {
                        const extracted = text.match(match.pattern);
                        if (extracted && (extracted[1] || extracted[2])) {
                            const name = extracted[1] || extracted[2];
                            this.memory.userName = name.trim();
                        }
                    }

                    // Personnalisation avec la mémoire
                    if (response.includes("[NAME]")) {
                        response = response.replace("[NAME]", this.memory.userName || "amigo");
                    }
                    return response;
                }

                // Fallback si aucune règle ne correspond
                return this.fallbacks[Math.floor(Math.random() * this.fallbacks.length)];
            }

            findMatch(text, rules) {
                for (let rule of rules) {
                    if (rule.pattern.test(text)) {
                        return rule;
                    }
                }
                return null;
            }

            getGreeting() {
                const saludos = {
                    general: `¡Hola ${this.memory.userName || ''}! Soy Eyano. ¿De qué te gustaría hablar hoy?`,
                    restaurant: `¡Hola ${this.memory.userName || ''}! Bienvenido a mi restaurante. Dime, ¿qué te apetece comer?`,
                    travel: `¡Hola! Bienvenido a Eyano Viajes. ¿A dónde sueñas con viajar?`,
                    interview: `Buenos días ${this.memory.userName || ''}. Gracias por venir a esta entrevista de trabajo. ¿Comenzamos?`
                };
                return saludos[this.memory.lastTopic] || saludos.general;
            }
        }

        /* =====================================================================
           ETAPE 2 : ÉCOUTER ET PARLER (Speech-to-Text & Text-to-Speech)
           ===================================================================== */
        class VoiceController {
            constructor(onResult, onSilence, onSpeechStart, onSpeechEnd) {
                this.synth = window.speechSynthesis;
                this.recognition = null;
                this.selectedVoice = null;
                this.isCallActive = false;

                // Callbacks UI
                this.onResult = onResult;
                this.onSilence = onSilence;
                this.onSpeechStart = onSpeechStart;
                this.onSpeechEnd = onSpeechEnd;

                this.initSpeechRecognition();
                this.loadVoices();
                if (speechSynthesis.onvoiceschanged !== undefined) {
                    speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
                }
            }

            initSpeechRecognition() {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                if (!SpeechRecognition) {
                    showToast("Erreur: Votre navigateur ne supporte pas la reconnaissance vocale. Utilisez Chrome.");
                    return;
                }

                this.recognition = new SpeechRecognition();
                this.recognition.lang = 'es-ES'; // Configuration stricte en Espagnol
                this.recognition.interimResults = false;
                this.recognition.continuous = true;
                this.recognition.maxAlternatives = 1;

                this.recognition.onstart = () => {
                    if(this.isCallActive) this.onSpeechStart('user');
                };

                this.recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    this.onResult(transcript);
                };

                this.recognition.onerror = (event) => {
                    console.warn("Speech recognition error:", event.error);
                    if (event.error === 'no-speech' && this.isCallActive) {
                        this.onSilence();
                    }
                };

                this.recognition.onend = () => {
                    if (this.isCallActive && !this.synth.speaking) {
                        // Relancer l'écoute si l'appel est actif et que l'avatar ne parle pas
                        try { this.recognition.start(); } catch(e){}
                    }
                };
            }

            loadVoices() {
                const voices = this.synth.getVoices();
                const selectEl = document.getElementById('select-voice');
                selectEl.innerHTML = '';
                
                // Filtrer les voix espagnoles
                const esVoices = voices.filter(v => v.lang.startsWith('es'));
                
                if (esVoices.length === 0) {
                    selectEl.innerHTML = '<option value="">Aucune voix espagnole trouvée. Installez-en une.</option>';
                    return;
                }

                esVoices.forEach((voice, index) => {
                    const option = document.createElement('option');
                    option.value = index;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    selectEl.appendChild(option);
                    
                    // Default to Google Español if available, or first ES voice
                    if (voice.name.includes("Google") && !this.selectedVoice) {
                        this.selectedVoice = voice;
                        selectEl.value = index;
                    }
                });

                if (!this.selectedVoice) {
                    this.selectedVoice = esVoices[0];
                    selectEl.value = 0;
                }
            }

            setVoiceIndex(index) {
                const esVoices = this.synth.getVoices().filter(v => v.lang.startsWith('es'));
                if (esVoices[index]) {
                    this.selectedVoice = esVoices[index];
                }
            }

            speak(text, onComplete) {
                if (this.synth.speaking) {
                    this.synth.cancel();
                }

                if (this.recognition) {
                    this.recognition.stop(); // Stop listening while talking
                }

                const utterance = new SpeechSynthesisUtterance(text);
                utterance.voice = this.selectedVoice;
                utterance.lang = 'es-ES';
                utterance.rate = 0.95; // Légèrement ralenti pour la clarté
                utterance.pitch = 1;

                utterance.onstart = () => {
                    this.onSpeechStart('eyano', text);
                };

                utterance.onend = () => {
                    this.onSpeechEnd('eyano');
                    if (this.isCallActive && onComplete) {
                        onComplete();
                        // Recommence à écouter après avoir parlé
                        setTimeout(() => {
                            if(this.isCallActive) {
                                try { this.recognition.start(); } catch(e){}
                            }
                        }, 500);
                    }
                };

                utterance.onerror = (e) => {
                    console.error("SpeechSynthesis error", e);
                    this.onSpeechEnd('eyano');
                }

                this.synth.speak(utterance);
            }

            startCall() {
                this.isCallActive = true;
            }

            endCall() {
                this.isCallActive = false;
                this.synth.cancel();
                if (this.recognition) {
                    this.recognition.stop();
                }
                this.onSpeechEnd('all');
            }
        }

        /* =====================================================================
   ETAPE MOBILE : AUTORISATION MICROPHONE SYSTEME
   ===================================================================== */

async function requestMobileMicrophonePermission() {

    // Vérifie support navigateur
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast("Microphone non supporté sur cet appareil.");
        return false;
    }

    try {

        // Demande explicite d'autorisation système
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });

        // Stop immédiat du flux après autorisation
        stream.getTracks().forEach(track => track.stop());

        showToast("Microphone autorisé avec succès.");
        return true;

    } catch (error) {

        console.error("Erreur permission microphone :", error);

        // Gestion intelligente mobile
        if (
            error.name === "NotAllowedError" ||
            error.name === "PermissionDeniedError"
        ) {

            showToast("Veuillez autoriser le microphone dans les paramètres du navigateur.");

        } else if (
            error.name === "NotFoundError" ||
            error.name === "DevicesNotFoundError"
        ) {

            showToast("Aucun microphone détecté.");

        } else {

            showToast("Impossible d'accéder au microphone.");
        }

        return false;
    }
}

    function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}


        /* =====================================================================
           ETAPE 4 : SYNCHRONISATION UI ET LOGIQUE GLOBALE
           ===================================================================== */
        
        // Instances globales
        const eyano = new EyanoLogicEngine();
        let voiceCtrl;
        
        // DOM Elements
        const btnCall = document.getElementById('btn-call');
        const callStatus = document.getElementById('callStatus');
        const subtitlesDisplay = document.getElementById('subtitles-display');
        const avatarUser = document.getElementById('avatar-user');
        const avatarEyano = document.getElementById('avatar-eyano');
        const indicatorUser = document.getElementById('indicator-user');
        const indicatorEyano = document.getElementById('indicator-eyano');
        
        // UI Helpers
        function showToast(msg) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').textContent = msg;
            toast.classList.remove('opacity-0');
            setTimeout(() => toast.classList.add('opacity-0'), 3000);
        }

        function setSubtitle(text, type = 'user') {
            subtitlesDisplay.textContent = `"${text}"`;
            subtitlesDisplay.classList.remove('opacity-0');
            subtitlesDisplay.style.color = type === 'user' ? '#10b981' : '#8b5cf6';
            
            // Auto hide after 4 seconds
            clearTimeout(subtitlesDisplay.timeout);
            subtitlesDisplay.timeout = setTimeout(() => {
                subtitlesDisplay.classList.add('opacity-0');
            }, 4000);
        }

        function toggleAvatarAnimation(target, isSpeaking) {
            // target: 'user' ou 'eyano' ou 'all' (pour arrêter)
            avatarUser.classList.remove('avatar-speaking-user');
            avatarEyano.classList.remove('avatar-speaking-eyano');
            indicatorUser.classList.add('opacity-0');
            indicatorEyano.classList.add('opacity-0');

            if (isSpeaking && target === 'user') {
                avatarUser.classList.add('avatar-speaking-user');
                indicatorUser.classList.remove('opacity-0');
            } else if (isSpeaking && target === 'eyano') {
                avatarEyano.classList.add('avatar-speaking-eyano');
                indicatorEyano.classList.remove('opacity-0');
            }
        }

        function updateCallButton(active) {
            const icon = btnCall.querySelector('i');
            const status = document.getElementById('call-status');
            if (active) {
                btnCall.classList.replace('bg-gray-700', 'bg-red-500');
                btnCall.classList.replace('hover:bg-gray-600', 'hover:bg-red-600');
                icon.classList.replace('fa-phone', 'fa-phone-slash');
                btnCall.classList.add('animate-pulse-fast');
                status.textContent = "Appel en cours... (Parlez)";
                status.classList.add('text-brand-accent');
            } else {
                btnCall.classList.replace('bg-red-500', 'bg-gray-700');
                btnCall.classList.replace('hover:bg-red-600', 'hover:bg-gray-600');
                icon.classList.replace('fa-phone-slash', 'fa-phone');
                btnCall.classList.remove('animate-pulse-fast');
                status.textContent = "Appuyez para empezar";
                status.classList.remove('text-brand-accent');
                toggleAvatarAnimation('all', false);
            }
        }

        // Callbacks de traitement vocal
        function handleSpeechResult(transcript) {
            setSubtitle(transcript, 'user');
            
            // Passer le texte au moteur logique
            const response = eyano.processInput(transcript);
            
            // Faire parler l'avatar avec un léger délai pour la naturalité
            setTimeout(() => {
                voiceCtrl.speak(response);
            }, 500);
        }

        function handleSilence() {
            // Si l'utilisateur ne dit rien pendant l'écoute
            if(voiceCtrl.isCallActive && !window.speechSynthesis.speaking) {
                 const fallback = "¿Hola? ¿Estás ahí? Puedes hablar ahora.";
                 voiceCtrl.speak(fallback);
            }
        }

        function handleSpeechStart(target, text = "") {
            toggleAvatarAnimation(target, true);
            if (target === 'eyano' && text) {
                setSubtitle(text, 'eyano');
            }
        }

        function handleSpeechEnd(target) {
            if (target !== 'all') {
                // Quand l'un s'arrête, préparer l'UI pour l'autre
                toggleAvatarAnimation(target, false);
                if(target === 'eyano' && voiceCtrl.isCallActive) {
                    // C'est au tour de l'utilisateur
                    toggleAvatarAnimation('user', true);
                }
            } else {
                toggleAvatarAnimation('all', false);
            }
        }

        // Initialisation globale
        window.addEventListener('DOMContentLoaded', () => {
            
            // Instancier le contrôleur vocal
            voiceCtrl = new VoiceController(
                handleSpeechResult,
                handleSilence,
                handleSpeechStart,
                handleSpeechEnd
            );

            // Gestion de l'appel
            btnCall.addEventListener('click', async () => {

    // =========================
    // MODE DEMARRAGE APPEL
    // =========================
    if (!voiceCtrl.isCallActive) {

        // MOBILE : demande permission système AVANT toute reconnaissance
        if (isMobileDevice()) {

            const granted = await requestMobileMicrophonePermission();

            if (!granted) {
                return;
            }
        }

        // Démarrer appel
        voiceCtrl.startCall();
        updateCallButton(true);

        // Salutation initiale
        const greeting = eyano.getGreeting();

        voiceCtrl.speak(greeting, () => {
            // Reconnaissance relancée automatiquement
        });

    } else {

        // =========================
        // MODE FIN APPEL
        // =========================
        voiceCtrl.endCall();
        updateCallButton(false);
        setSubtitle("", "user");
    }
});

            // Gestion de la modale de configuration
            const modal = document.getElementById('modal-settings');
            const modalContent = document.getElementById('modal-content');
            
            document.getElementById('btn-settings').addEventListener('click', () => {
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                setTimeout(() => {
                    modalContent.classList.remove('scale-95', 'opacity-0');
                }, 10);
            });

            const closeModal = () => {
                modalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }, 300);
            };

            document.getElementById('btn-close-settings').addEventListener('click', closeModal);

            // Sélection des thèmes
            const topicBtns = document.querySelectorAll('.topic-btn');
            topicBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Reset styling
                    topicBtns.forEach(b => {
                        b.classList.remove('border-brand-accent', 'bg-brand-accent/20');
                        b.classList.add('border-gray-600');
                    });
                    // Active styling
                    e.target.classList.remove('border-gray-600');
                    e.target.classList.add('border-brand-accent', 'bg-brand-accent/20');
                    // Set Logic
                    eyano.setTopic(e.target.dataset.topic);
                });
            });

            // Sauvegarde des paramètres
            document.getElementById('btn-save-settings').addEventListener('click', () => {
                const username = document.getElementById('input-username').value;
                const voiceIndex = document.getElementById('select-voice').value;
                
                eyano.setUserName(username);
                if (username) {
                    document.getElementById('display-username').textContent = username;
                }
                
                if (voiceIndex) {
                    voiceCtrl.setVoiceIndex(parseInt(voiceIndex));
                }

                showToast("Configuration sauvegardée avec succès.");
                closeModal();
            });

            // Alerte initiale (Autorisations requises)
            setTimeout(() => {
                showToast("N'oubliez pas d'autoriser l'accès au microphone !");
            }, 1000);
        });