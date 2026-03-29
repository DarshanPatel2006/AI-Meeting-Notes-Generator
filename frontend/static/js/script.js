const API_URL = "";

let mediaRecorder;
let audioChunks = [];
let stream;
let recordingInterval;
let seconds = 0;
let audioContext;



function showTranscriptLoader() {
    const loader = document.getElementById("transcriptLoader");
    if (loader) loader.classList.add("active");
}

function hideTranscriptLoader() {
    const loader = document.getElementById("transcriptLoader");
    if (loader) loader.classList.remove("active");
}

function showAudioLoader() {
    const loader = document.getElementById("audioLoader");
    if (loader) loader.classList.add("active");
}

function hideAudioLoader() {
    const loader = document.getElementById("audioLoader");
    if (loader) loader.classList.remove("active");
}

// =============================
// 🎤 RECORDING SYSTEM (FINAL)
// =============================



// 🔥 START RECORDING
async function startRecording() {

    // ❌ prevent double click
    if (mediaRecorder && mediaRecorder.state === "recording") return;

    try {
        // 🎤 get mic
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.start();

        // 🔥 show overlay
        document.getElementById("recordingOverlay").classList.add("active");

        // 🔥 timer
        seconds = 0;
        recordingInterval = setInterval(() => {
            seconds++;
            const min = String(Math.floor(seconds / 60)).padStart(2, '0');
            const sec = String(seconds % 60).padStart(2, '0');
            document.getElementById("recordingTime").innerText = `${min}:${sec}`;
        }, 1000);

        // 🔥 REAL AUDIO WAVE
        // 🔥 REAL AI ORB WAVE (UPGRADE)
        audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        source.connect(analyser);

        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        // 🎨 canvas setup
        const canvas = document.getElementById("voiceWave");
        const ctx = canvas.getContext("2d");

        canvas.width = 220;
        canvas.height = 220;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // 🔥 draw orb
        let time = 0;
        let smoothVolume = 0;

        function drawOrb(volume) {

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // 🎤 smooth input
            let target = Math.min(volume / 50, 1.5);
            smoothVolume = smoothVolume * 0.92 + target * 0.08;

            // 💓 breathing (AI alive even silent)
            let breathing = Math.sin(time * 0.5) * 3;

            let baseRadius = 50 + Math.sin(time * 0.8) * 2;
            let radius = baseRadius + breathing + smoothVolume * 12;

            // 🌌 OUTER AURA (soft energy field)
            let aura = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius + 80);
            aura.addColorStop(0, "rgba(168,85,247,0.15)");
            aura.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = aura;
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 50, 0, Math.PI * 2);
            ctx.fill();

            // ✨ SECOND GLOW (tight glow)
            let glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius + 30);
            glow.addColorStop(0, "rgba(192,132,252,0.4)");
            glow.addColorStop(1, "rgba(76,29,149,0)");

            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
            ctx.fill();

            // 🟣 MAIN LIQUID ORB
            ctx.beginPath();

            for (let i = 0; i < 360; i++) {

                let angle = i * Math.PI / 180;

                // 🎯 controlled organic motion (NO explosion)
                let wave =
                    Math.sin(angle * 3 + time) * (smoothVolume * 2.5) +
                    Math.sin(angle * 6 + time * 1.2) * 1.5;

                let r = radius + wave;

                let x = cx + r * Math.cos(angle);
                let y = cy + r * Math.sin(angle);

                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            ctx.closePath();

            // 🎨 orb gradient (depth)
            let gradient = ctx.createRadialGradient(cx, cy, 15, cx, cy, radius);
            gradient.addColorStop(0, "#f5d0fe");   // bright core
            gradient.addColorStop(0.3, "#c084fc");
            gradient.addColorStop(0.6, "#9333ea");
            gradient.addColorStop(1, "#4c1d95");

            ctx.fillStyle = gradient;
            ctx.fill();

            time += 0.035;
        }

        // 🔁 animation loop
        function animateWave() {

            analyser.getByteFrequencyData(dataArray);

            let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

            // 🔥 make it reactive AF
            volume = volume * 1.5;

            drawOrb(volume);

            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                requestAnimationFrame(animateWave);
            }
        }

        animateWave();

    } catch (err) {
        alert("Microphone access denied.");
        console.error(err);
    }
}


// ⏸ PAUSE
function pauseRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.pause();
        clearInterval(recordingInterval);
    }
}


// ▶ RESUME
function resumeRecording() {
    if (mediaRecorder && mediaRecorder.state === "paused") {
        mediaRecorder.resume();

        recordingInterval = setInterval(() => {
            seconds++;
            const min = String(Math.floor(seconds / 60)).padStart(2, '0');
            const sec = String(seconds % 60).padStart(2, '0');
            document.getElementById("recordingTime").innerText = `${min}:${sec}`;
        }, 1000);
    }
}


// ⏹ STOP RECORDING
function stopRecording() {

    if (!mediaRecorder) return;

    clearInterval(recordingInterval);

    // 🔥 hide overlay
    document.getElementById("recordingOverlay").classList.remove("active");

    mediaRecorder.stop();

    // 🔥 STOP MIC (fix red dot)
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    // 🔥 CLOSE AUDIO CONTEXT
    if (audioContext) {
        audioContext.close();
    }

    mediaRecorder.onstop = async () => {

        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        showAudioLoader();

        try {
            const response = await fetch("/upload-audio", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            showResult(data.meeting_notes, data.transcript);

        } catch (err) {
            console.error(err);
            alert("Audio processing failed.");
        }

        hideAudioLoader();

        // 🔥 RESET EVERYTHING
        mediaRecorder = null;
        stream = null;
        audioChunks = [];
    };
}


// 🔥 SAFETY (close mic if tab closed)
window.addEventListener("beforeunload", () => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});

function typeEffect(text, element, speed = 10) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }

    typing();
}

function formatNotes(notes) {

    return notes

        // 🔥 REMOVE MARKDOWN (ANY TYPE)
        .replace(/\*\*/g, "")
        .replace(/#+/g, "")

        // 🔥 FIX HEADINGS (ANY VARIATION)
        .replace(/summary\s*:/gi, "\n📝 Summary\n")
        .replace(/key\s*points\s*:/gi, "\n📌 Key Points\n")
        .replace(/action\s*items\s*:/gi, "\n✅ Action Items\n")

        // 🔥 FIX BULLETS (ALL TYPES)
        .replace(/^\s*[-•*]\s+/gm, "• ")
        .replace(/^\s*\d+\.\s+/gm, "• ")

        // 🔥 CLEAN EXTRA SYMBOLS
        .replace(/[^\S\r\n]{2,}/g, " ")

        // 🔥 REMOVE EMPTY LINES
        .replace(/\n{3,}/g, "\n\n")
        .replace(/Summary\n/g, "Summary\n\n")

        // 🔥 FINAL CLEAN
        .trim();
}


async function uploadPDF() {

    const fileInput = document.getElementById("pdfFile");

    if (!fileInput.files.length) {
        alert("Please upload a PDF file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    showTranscriptLoader();

    try {
        const response = await fetch("/upload-pdf", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.transcript && data.meeting_notes) {
            showResult(data.meeting_notes, data.transcript);
        } else {
            alert("PDF processing failed.");
        }

    } catch (err) {
        console.error(err);
        alert("Error uploading PDF.");
    }

    hideTranscriptLoader();
}

document.getElementById("pdfFile")?.addEventListener("change", uploadPDF);

/* Navigate to result page */
function showResult(notes, transcript) {

    localStorage.setItem("meetingNotes", notes);
    localStorage.setItem("meetingTranscript", transcript);

    // 🔥 smooth transition
    document.body.style.opacity = "0.7";

    setTimeout(() => {
        window.location.href = "/result";
    }, 400);
}

function toggleNotes() {

    const content = document.getElementById("notesContent");
    const btn = document.getElementById("toggleBtn");

    content.classList.toggle("expanded");

    if (content.classList.contains("expanded")) {
        btn.innerText = "Show Less";
    } else {
        btn.innerText = "View Full Notes";
    }
}

function startSpeechToText() {

    const input = document.getElementById("question");
    const micBtn = document.querySelector(".mic-btn");

    // 🎤 browser support check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN"; // 🔥 works better for Indian accent
    recognition.interimResults = false;

    // 🔴 UI ACTIVE
    micBtn.classList.add("active");

    recognition.start();

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;

        // 🔥 PUT TEXT IN INPUT
        input.value = transcript;
    };

    recognition.onend = function() {
        micBtn.classList.remove("active");
    };

    recognition.onerror = function() {
        micBtn.classList.remove("active");
        alert("Mic error, try again");
    };
}

function speakSummary() {

    const notes = localStorage.getItem("meetingNotes");

    if (!notes) {
        alert("No notes available.");
        return;
    }

    // 🔥 Extract only Summary section
    let summaryMatch = notes.match(/Summary:\s*([\s\S]*?)Key Points:/i);

    let summaryText = summaryMatch
        ? summaryMatch[1].trim()
        : notes; // fallback

    // 🔥 Clean text
    summaryText = summaryText.replace(/[-•]/g, "");

    // 🔊 SPEECH
    const speech = new SpeechSynthesisUtterance(summaryText);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

function stopSpeech() {
    window.speechSynthesis.cancel();
}

function handleVoiceToggle() {

    const toggle = document.getElementById("voiceToggle");

    const notes = localStorage.getItem("meetingNotes");

    if (!notes) {
        alert("No notes available.");
        toggle.checked = false;
        return;
    }

    // 🔥 Extract summary
    let summaryMatch = notes.match(/Summary:\s*([\s\S]*?)Key Points:/i);

    let summaryText = summaryMatch
        ? summaryMatch[1].trim()
        : notes;

    summaryText = summaryText.replace(/[-•]/g, "");

    if (toggle.checked) {
        // ▶️ PLAY

        const speech = new SpeechSynthesisUtterance(summaryText);

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;

        speech.onend = () => {
            toggle.checked = false; // 🔥 auto reset when done
        };

        window.speechSynthesis.speak(speech);

    } else {
        // ⏸ STOP
        window.speechSynthesis.cancel();
    }
}

document.getElementById("voiceToggle")?.addEventListener("change", handleVoiceToggle);

/* Generate notes from transcript */
async function generateNotes() {

    const textarea = document.getElementById("transcript");
    if (!textarea) return;

    const transcript = textarea.value.trim();
    if (!transcript) {
        alert("Please enter transcript text.");
        return;
    }

    showTranscriptLoader(); // 🔥 NEW

    try {
        const response = await fetch("/generate-notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ transcript: transcript })
        });

        const data = await response.json();

        if (data.meeting_notes) {
            showResult(data.meeting_notes, transcript);
        } else {
            alert("AI did not return notes.");
        }

    } catch (error) {
        console.error(error);
        alert("Error generating notes.");
    }

    hideTranscriptLoader(); // 🔥 NEW
}

/* Upload audio */
async function uploadAudio() {

    const fileInput = document.getElementById("audioFile");
    if (!fileInput) return;

    if (!fileInput.files.length) {
        alert("Please choose an audio file.");
        return;
    }

    showAudioLoader(); // 🔥 ADD THIS

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {

        const response = await fetch("/upload-audio", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.meeting_notes && data.transcript) {
            showResult(data.meeting_notes, data.transcript);
        } else {
            alert("AI could not process the audio.");
        }

    } catch (error) {
        console.error(error);
        alert("Audio upload failed.");
    }

    hideAudioLoader(); // 🔥 ADD THIS
}

/* Load result page */
window.addEventListener("DOMContentLoaded", function () {

    const resultBox = document.getElementById("notesOutput");

    if (resultBox) {
        const notes = localStorage.getItem("meetingNotes");
        if (notes) {

            const formattedNotes = formatNotes(notes);

            resultBox.textContent = formattedNotes;
        } else {
            resultBox.textContent = "No notes generated yet.";
        }
    }

});

/* Download notes */
function downloadNotes() {

    const notes = localStorage.getItem("meetingNotes");
    if (!notes) {
        alert("No notes available.");
        return;
    }

    const blob = new Blob([notes], { type: "text/plain" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meeting_notes.txt";
    link.click();
}

/* 🔥 ASK QUESTION (NEW FEATURE) */
async function askQuestion() {

    const questionInput = document.getElementById("question");
    const answerBox = document.getElementById("answerBox");

    const question = questionInput.value.trim();
    const transcript = localStorage.getItem("meetingTranscript");

    if (!question) {
        alert("Please enter a question.");
        return;
    }

    if (!transcript) {
        alert("Transcript not found.");
        return;
    }

    answerBox.innerText = "Thinking... 🤖";

    try {
        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                question: question,
                transcript: transcript
            })
        });

        const data = await response.json();

        answerBox.innerText = data.answer;

    } catch (error) {
        console.error(error);
        answerBox.innerText = "Error getting answer.";
    }
}


const canvas = document.getElementById("particles");

if (canvas) {
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 200,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.7 + 0.2,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59,130,246,${p.opacity})`;
            ctx.fill();

            p.y -= p.speed;

            if (p.y < 0) {
                p.y = canvas.height + Math.random() * 100;
                p.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
}

// 🔥 responsive fix
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const input = document.getElementById("audioFile");
const text = document.getElementById("fileText");

if (input) {
    input.addEventListener("change", () => {
        text.textContent = input.files.length
            ? input.files[0].name
            : "Click to upload audio";
    });
}

