const API_URL = "http://127.0.0.1:8000";

function showLoader(){
const loader=document.getElementById("loaderOverlay");
if(loader){
loader.style.display="flex";
}
}

function hideLoader(){
const loader=document.getElementById("loaderOverlay");
if(loader){
loader.style.display="none";
}
}

/* Navigate to result page */
function showResult(notes) {
    localStorage.setItem("meetingNotes", notes);
    window.location.href = "/static/result.html";
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

    try {
        showLoader();

        const response = await fetch(API_URL + "/generate-notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ transcript: transcript })
        });

        const data = await response.json();
        hideLoader();

        if (data.meeting_notes) {
            showResult(data.meeting_notes);
        } else {
            alert("AI did not return notes.");
        }

    } catch (error) {
        hideLoader();
        console.error(error);
        alert("Error generating notes.");
    }
}

/* Upload audio */
async function uploadAudio() {

    const fileInput = document.getElementById("audioFile");
    if (!fileInput) return;

    if (!fileInput.files.length) {
        alert("Please choose an audio file.");
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        showLoader();

        const response = await fetch(API_URL + "/upload-audio", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        hideLoader();

        if (data.meeting_notes) {
            showResult(data.meeting_notes);
        } else {
            alert("AI could not process the audio.");
        }

    } catch (error) {
        hideLoader();
        console.error(error);
        alert("Audio upload failed.");
    }
}

/* Load result page */
window.addEventListener("DOMContentLoaded", function () {

    const resultBox = document.getElementById("result");

    if (resultBox) {
        const notes = localStorage.getItem("meetingNotes");
        if (notes) {
            resultBox.textContent = notes;
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