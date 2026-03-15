import ollama


def generate_meeting_notes(transcript):

    prompt = f"""
You are an AI meeting assistant.

Analyze the meeting transcript and generate structured notes.

Return the output in this format:

Summary:
Key Points:
Action Items:

Meeting Transcript:
{transcript}
"""

    response = ollama.chat(
        model="llama3",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response["message"]["content"]