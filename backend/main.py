from pydantic import BaseModel
from backend.ai_processor import generate_meeting_notes
from fastapi import FastAPI, UploadFile, File
from backend.speech_to_text import transcribe_audio
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()


class TranscriptRequest(BaseModel):
    transcript: str


# @app.get("/")
# def home():
#     return {"message": "AI Meeting Notes Generator API is running"}


@app.post("/generate-notes")
def generate_notes(data: TranscriptRequest):

    result = generate_meeting_notes(data.transcript)

    return {
        "meeting_notes": result
    }

@app.post("/upload-audio")
async def upload_audio(file: UploadFile = File(...)):

    file_location = f"uploads/{file.filename}"

    with open(file_location, "wb") as f:
        f.write(await file.read())

    transcript = transcribe_audio(file_location)

    notes = generate_meeting_notes(transcript)

    return {
        "transcript": transcript,
        "meeting_notes": notes
    }

app.mount("/static", StaticFiles(directory="frontend"), name="static")

@app.get("/")
def serve_app():
    return FileResponse("frontend/index.html")