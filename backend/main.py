from pydantic import BaseModel
from backend.ai_processor import generate_meeting_notes
from backend.speech_to_text import transcribe_audio

import fitz 
from fastapi import FastAPI, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import uuid
from datetime import datetime
import ollama
import os

app = FastAPI()

# ✅ STATIC FILES (ONLY ONE TIME)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# 📄 HTML ROUTES (PRODUCT LEVEL)
# =========================

@app.get("/")
def home():
    return FileResponse("frontend/index.html")

@app.get("/audio")
def audio_page():
    return FileResponse("frontend/audio.html")

@app.get("/transcript")
def transcript_page():
    return FileResponse("frontend/transcript.html")

@app.get("/result")
def result_page():
    return FileResponse("frontend/result.html")


# =========================
# 📦 MODELS
# =========================

class TranscriptRequest(BaseModel):
    transcript: str

class ChatRequest(BaseModel):
    question: str
    transcript: str


# =========================
# 🧠 GENERATE NOTES
# =========================

@app.post("/generate-notes")
def generate_notes(data: TranscriptRequest):
    result = generate_meeting_notes(data.transcript)
    return {"meeting_notes": result}


from fastapi import UploadFile, File
import fitz  # PyMuPDF

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    # 🔒 validate
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF files are allowed"}

    contents = await file.read()

    # 📄 open PDF
    pdf = fitz.open(stream=contents, filetype="pdf")

    text = ""
    for page in pdf:
        page_text = page.get_text()
        if page_text:
            text += page_text

    if not text.strip():
        return {"error": "No readable text found in PDF"}

    # 🧠 AI
    notes = generate_meeting_notes(text)

    return {
        "transcript": text,
        "meeting_notes": notes
    }



# =========================
# 🎤 AUDIO UPLOAD
# =========================

@app.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):

    os.makedirs("uploads", exist_ok=True)

    filename = f"{uuid.uuid4()}_{file.filename}"
    file_location = f"uploads/{filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    transcript = transcribe_audio(file_location)
    notes = generate_meeting_notes(transcript)
    print("TRANSCRIPT:", transcript)

    return {
        "transcript": transcript,
        "meeting_notes": notes
    }


# =========================
# 💬 ASK QUESTIONS (HYBRID AI)
# =========================

@app.post("/ask")
def ask_question(data: ChatRequest):

    question = data.question.lower()

    # 🔹 REAL-TIME QUICK ANSWERS
    if "today" in question and "date" in question:
        today = datetime.now().strftime("%A, %d %B %Y")
        return {"answer": f"Today's date is {today}"}

    if "time" in question:
        now = datetime.now().strftime("%I:%M %p")
        return {"answer": f"Current time is {now}"}

    if "weather" in question:
        return {
            "answer": "Offline mode: Weather data not available, but it's usually warm and sunny."
        }

    # 🔹 AI PROMPT
    prompt = f"""
You are an advanced AI assistant.

You have:
1. A meeting transcript
2. Your general world knowledge

RULES:
- If meeting related → use transcript
- If unclear → explain
- If unrelated → answer normally
- Do not guess wrong facts

Transcript:
{data.transcript}

Question:
{data.question}
"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return {"answer": response["message"]["content"]}