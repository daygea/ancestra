let speech = null;
let isPlaying = false;
let isPaused = false;

function togglePlayPause() {
    const playPauseBtn = document.getElementById("playPauseBtn");

    if (isPlaying && !isPaused) {
        // Pause the speech
        window.speechSynthesis.pause();
        isPaused = true;
        playPauseBtn.innerHTML = "▶️ Resume";
    } else if (isPaused) {
        // Resume the speech
        window.speechSynthesis.resume();
        isPaused = false;
        playPauseBtn.innerHTML = "⏸ Pause";
    } else {
        // Restart the speech from the beginning
        playResult();
        playPauseBtn.innerHTML = "⏸ Pause";
    }

    isPlaying = true;
}

function playResult() {
    const text = document.getElementById("divinationResult").textContent;

    if (!text.trim()) return;

    // Stop any ongoing speech before playing new one
    window.speechSynthesis.cancel();

    speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Change this for Yoruba support

    speech.onend = () => {
        isPlaying = false;
        isPaused = false;
        document.getElementById("playPauseBtn").innerHTML = "🔊 Play Voice"; // Reset button
    };

    window.speechSynthesis.speak(speech);
    isPlaying = true;
    isPaused = false;
}

function resetSpeechState() {
    // Cancel ongoing speech when navigating elsewhere
    window.speechSynthesis.cancel();
    isPlaying = false;
    isPaused = false;
    const playPauseBtn = document.getElementById("playPauseBtn");
    if (playPauseBtn) {
        playPauseBtn.innerHTML = "🔊 Play Voice"; // Reset button text
    }
}

function showControls() {
    let controls = document.getElementById("voiceControls");

    // If controls already exist, do nothing
    if (controls) return;

    // Create controls dynamically
    controls = document.createElement("div");
    controls.id = "voiceControls";
    controls.style.textAlign = "center";
    controls.style.marginTop = "20px";
    
     controls.innerHTML = `
        <button class="app-btn" id="playPauseBtn" onclick="togglePlayPause()" style="padding: 10px; font-size: 16px; float: left;">🔊 Play Voice</button>
    `;

    document.getElementById("divinationResult").appendChild(controls);
}

function removeControl() {
    const controls = document.getElementById("voiceControls");
    if (controls) {
        controls.remove(); // Remove the entire div, not just hide it
    }
}

// Function to stop any ongoing speech before starting a new one
function stopSpeech() {
    if (speechSynthesis.speaking || speechSynthesis.paused) {
        speechSynthesis.cancel();
        isPaused = false;
        if (document.getElementById("pauseBtn")) {
            document.getElementById("pauseBtn").innerText = "Pause";
        }
    }
}


const smoothScrollTo = (targetPosition, duration) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
    const animation = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };
    const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };
    requestAnimationFrame(animation);
};

const SECRET_KEY = "DqUHBw7iFj3ia0pyp+QIvKJ5NgJFXE2PcZk95Kt2w6qpqOZ82iAF4Kx88Khb2KFl";
    // Encrypt data using AES
function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}
// Decrypt data
function decryptData(encryptedData) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
        return null;
    }
}

// List of pre-hashed admin passwords (add more if needed)
const storedHashedPasswords = [
    "f3b4affffec5ec69ea24a382c3178b7440986fbe9b537b7afe90c5c1337d0e77",
    "43dc88eaab6c2de6208ba193a48ef66309f05e810d3af47e5c654218d8bfadd8",
    "4849a6a362ae149353a4077359f4886f6a1e89399c6aa90f3d0678d129c833eb",
    "01fcd586d878e01b7fc94d5ba229fe5a03e228ec54df1638cecced060c9b4e1e",
    "005bd5b31e3c9fe8c7aa4fe1cb967787ac6a1a0d539282168c4ad8fa9f364984"
];

// Function to hash the password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
