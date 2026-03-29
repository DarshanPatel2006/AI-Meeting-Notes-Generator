<<<<<<< HEAD
# 🤖 Ashtavakra AI – Meeting Notes Generator

AI-powered web app that converts meeting audio or transcripts into structured notes using **Whisper** and **Llama3 (Ollama)**.

---

## 🚀 Features

- Convert audio → text using Whisper  
- Generate structured notes:
  - Summary  
  - Key Points  
  - Action Items  
- Ask questions from generated notes  
- Fully local AI (no paid APIs)  
- Clean and simple UI  

---

## 🧠 Workflow

Audio / Transcript  
↓  
Whisper (Speech-to-Text)  
↓  
Transcript  
↓  
Llama3 (Ollama)  
↓  
Structured Notes  

---
=======
# 🤖 Maniot — AI Meeting Intelligence System

Maniot is a fully local AI-powered web application that transforms meeting audio, transcripts, and documents into structured, actionable insights.

Built using Whisper and Llama3 (Ollama), Maniot converts unstructured conversations into clear summaries, key points, and action items — all without relying on paid APIs.

---

## 🚀 Features

* 🎤 Upload meeting audio files
* 📄 Upload PDF documents
* 📝 Paste custom transcripts
* 🧠 Generate structured notes:

  * Summary
  * Key Points
  * Action Items
* ❓ Ask questions based on generated notes
* 🔊 Listen to AI-generated summaries (Text-to-Speech)
* 🎙 Voice input for asking questions (Speech-to-Text)
* 📥 Download generated notes
* ⚡ Fully local AI (privacy-friendly, no API cost)
* 🎨 Modern glassmorphism UI with smooth interactions

---

## 🧠 How It Works

```
Audio / PDF / Transcript
          ↓
Whisper (Speech-to-Text)
          ↓
Transcript Extraction
          ↓
Llama3 (Ollama)
          ↓
Structured Notes Generation
          ↓
Summary + Key Points + Action Items
```

---

## 🛠 Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Frontend         | HTML, CSS, JavaScript |
| Backend          | FastAPI               |
| Speech-to-Text   | OpenAI Whisper        |
| LLM              | Llama3 (Ollama)       |
| PDF Processing   | PyMuPDF               |
| Audio Processing | FFmpeg                |

---

## 📂 Project Structure

```
frontend/
│── static/
│   ├── css/
│   ├── js/
│   ├── icons/
│   └── images/
│
│── index.html
│── audio.html
│── transcript.html
│── result.html
>>>>>>> 515103f (Updated README + added screenshots + add more fonction + UI improvements + ask questions feature)

## 🛠 Tech Stack

<<<<<<< HEAD
- Frontend: HTML, CSS, JavaScript  
- Backend: FastAPI  
- Speech-to-Text: Whisper  
- LLM: Llama3 (Ollama)  
- Audio: FFmpeg  

---

## 📸 Screenshots

![Landing](screenshots/landing_page.png)  
![Upload](screenshots/audio_upload.png)  
![Transcript](screenshots/transcript_input.png)  
![Processing](screenshots/loading_screen.png)  
![Result](screenshots/generated_notes.png)  
![Ask](screenshots/ask_qustions.png)  

---

## ⚙️ Setup

```bash
git clone https://github.com/DarshanPatel2006/AI-Meeting-Notes-Generator.git
cd AI-Meeting-Notes-Generator
=======
uploads/
screenshots/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_USERNAME/Maniot.git
cd Maniot
```

### 2️⃣ Create Virtual Environment

```
python -m venv venv
```

### 3️⃣ Activate Environment

```
venv\Scripts\activate
```

### 4️⃣ Install Dependencies

```
pip install -r requirements.txt
```

### 5️⃣ Install Required Tools

* Install **FFmpeg**
* Install **Ollama**
>>>>>>> 515103f (Updated README + added screenshots + add more fonction + UI improvements + ask questions feature)

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

```
ollama run llama3
<<<<<<< HEAD
uvicorn backend.main:app --reload

Open:
http://localhost:8000/
```
## 📌 Future Improvements
```
Speaker identification
Real-time transcription
RAG-based search
Export to PDF
```

## 👨‍💻 Author
### Darshan Patel
⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!
=======
```

### 6️⃣ Run Backend

```
uvicorn backend.main:app --reload
```

### 7️⃣ Open in Browser

```
http://127.0.0.1:8000/
```

---

## 📸 Screenshots

* 🏠 Landing Page
* 🎤 Audio Upload
* 📄 PDF Upload
* 📝 Transcript Input
* ⏳ AI Processing
* 📊 Generated Notes
* ❓ Ask AI
* 🔊 Voice Interaction

---

## 🔥 Key Highlights

* Fully offline AI system (no API dependency)
* Multi-input support: Audio, PDF, Text
* Voice-enabled interaction (input + output)
* Clean and modern UI design
* Real-world productivity use case

---

## 📌 Future Improvements

* 🔊 Speaker diarization (who said what)
* 🧠 RAG-based intelligent search
* 📚 Vector database memory
* 🎙 Real-time transcription
* 🌍 Multi-language support
* 📊 Advanced analytics dashboard

---

## 👨‍💻 Author

**Darshan Patel**
AI / ML Developer 🚀

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
>>>>>>> 515103f (Updated README + added screenshots + add more fonction + UI improvements + ask questions feature)
