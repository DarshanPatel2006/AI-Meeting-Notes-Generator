import ollama


def generate_meeting_notes(transcript):

    prompt = f"""
You are a professional AI meeting assistant.

Analyze the transcript and generate high-quality meeting notes.

RULES:
- Extract meaningful information clearly
- If owner is mentioned → include it
- If not clearly mentioned → try to infer from context
- If still not possible → write "Not specified"
- Keep notes professional and useful

Return format:

Summary:
(2-3 lines)

Key Points:
- clear point
- clear point

Action Items:
- Owner: <name or Not specified> | Task: <clear task> | Deadline: <date or Not specified>

Transcript:
{transcript}
"""

    response = ollama.chat(
        model="llama3",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response["message"]["content"]