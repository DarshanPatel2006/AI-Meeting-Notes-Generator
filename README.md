# 🤖 AI Meeting Notes Generator

An AI-powered web application that converts meeting audio or transcripts into structured notes using **Whisper Speech-to-Text** and **Llama3 (Ollama)**.

---

## 🚀 Features

- 🎤 Upload meeting audio and convert it to text
- 📝 Generate structured meeting notes automatically
- 📌 Extract **Summary, Key Points, and Action Items**
- 🧠 Uses **local LLM (Llama3 via Ollama)** – no paid APIs required
- ⚡ Fast backend with **FastAPI**
- 🌐 Interactive frontend interface
- ⏳ AI processing loader animation
- 📥 Download generated notes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
Frontend | HTML, CSS, JavaScript |
Backend | FastAPI |
Speech Recognition | OpenAI Whisper |
LLM | Llama3 (Ollama) |
Audio Processing | FFmpeg |

---

## 🧠 How It Works


Audio File
↓
Whisper Speech-to-Text
↓
Transcript
↓
Llama3 (Ollama)
↓
Structured Meeting Notes
↓
Summary + Key Points + Action Items


---

## 📸 Screenshots

### Landing Page
![Landing](screenshots/landing_page.png)

### Upload Audio
![Upload](screenshots/audio_upload.png)

### Transcript Input
![Transcript](screenshots/transcript_input.png)

### AI Processing
![Loader](screenshots/loading_screen.png)

### Generated Notes
![Result](screenshots/generated_notes.png)

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/AI-Meeting-Notes-Generator.git
cd AI-Meeting-Notes-Generator

Create virtual environment:

python -m venv venv

Activate environment:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Install FFmpeg and Ollama before running.

Run the server:

uvicorn backend.main:app --reload

Open in browser:

http://127.0.0.1:8000/app
📌 Future Improvements

Speaker identification

Vector database memory

RAG-based meeting search

Real-time meeting transcription

Export notes as PDF

👨‍💻 Author

Darshan Patel
AI / ML Developer