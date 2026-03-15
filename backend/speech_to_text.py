import whisper
import os

# Add ffmpeg path so Whisper can find it
os.environ["PATH"] += os.pathsep + r"C:\Users\darsh\AppData\Local\Microsoft\WinGet\Links"

model = whisper.load_model("base")

def transcribe_audio(file_path):
    result = model.transcribe(file_path)
    return result["text"]