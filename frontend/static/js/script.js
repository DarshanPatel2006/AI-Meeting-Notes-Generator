const API_URL = "http://127.0.0.1:8000";

function askQuestion() {
    document.querySelector(".ai-orb").style.animation = "pulse 0.8s infinite";
}

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

/* Navigate to result page */
function showResult(notes, transcript) {
    localStorage.setItem("meetingNotes", notes);
    localStorage.setItem("meetingTranscript", transcript); // IMPORTANT 🔥
    window.location.href = "/result";
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
        const response = await fetch(API_URL + "/generate-notes", {
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

        const response = await fetch(API_URL + "/upload-audio", {
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
            resultBox.innerHTML = notes
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
            .replace(/\n/g, "<br>");
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
        const response = await fetch(API_URL + "/ask", {
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

