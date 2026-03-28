🤖 AI Meeting Notes Generator (Ashtavakra AI)

An AI-powered web application that converts meeting audio or transcripts into structured notes using Whisper (Speech-to-Text) and Llama3 (Ollama) — fully local, fast, and no paid APIs 🚀

🔥 What’s New (Latest Updates)
❓ Ask Questions from Generated Notes (NEW 🔥)
🎨 Added favicon & PWA icons
⚡ Improved UI & smooth loading animation
📂 Clean and structured project architecture
📸 Added screenshots for better documentation
🧠 Fully local AI (privacy-friendly, no API cost)
🚀 Features
🎤 Upload meeting audio files
🧾 Convert audio → text using Whisper
✍️ Paste custom transcripts manually
📝 Generate structured meeting notes:
Summary
Key Points
Action Items
❓ Ask questions based on generated notes
⚡ Powered by Llama3 (Ollama)
🌐 Interactive frontend UI
⏳ AI processing loader animation
📥 Download generated notes
🛠 Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	FastAPI
Speech-to-Text	OpenAI Whisper
LLM	Llama3 (Ollama)
Audio Processing	FFmpeg
🧠 How It Works
Audio / Transcript
        ↓
Whisper (Speech-to-Text)
        ↓
Transcript
        ↓
Llama3 (Ollama)
        ↓
Structured Notes
        ↓
Summary + Key Points + Action Items
📸 Screenshots
🏠 Landing Page

🎤 Upload Audio

📝 Transcript Input

⏳ AI Processing

📊 Generated Notes

❓ Ask Questions Feature

📂 Project Structure
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

backend/
│── main.py

screenshots/
uploads/
⚙️ Installation
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/AI-Meeting-Notes-Generator.git
cd AI-Meeting-Notes-Generator
2️⃣ Create Virtual Environment
python -m venv venv
3️⃣ Activate Environment
venv\Scripts\activate
4️⃣ Install Dependencies
pip install -r requirements.txt
5️⃣ Install Required Tools
Install FFmpeg
Install Ollama

Pull Llama3 model:

ollama run llama3
6️⃣ Run Backend
uvicorn backend.main:app --reload
7️⃣ Open in Browser
http://127.0.0.1:8000/app
📌 Future Improvements
🔊 Speaker Identification
🧠 RAG-based smart search
📚 Vector database memory
🎙 Real-time transcription
📄 Export notes as PDF
🌍 Multi-language support
👨‍💻 Author

Darshan Patel
AI / ML Developer 🚀

⭐ Support

If you like this project, give it a ⭐ on GitHub!