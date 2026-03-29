import ollama

def generate_meeting_notes(transcript):

    prompt = f"""
You are an advanced AI meeting assistant.

Your job is to deeply understand the FULL content of the transcript (audio, PDF, or text) and generate structured notes.

========================
STRICT OUTPUT RULES
========================
- Follow format EXACTLY
- No markdown (no **, no #)
- Use "-" for bullets
- Clean plain text only

========================
OUTPUT FORMAT
========================

Summary:
Write 3-5 sentences that:
- Capture the MAIN PURPOSE of the meeting/document
- Mention KEY decisions or outcomes
- Reflect overall context (discussion, planning, reporting, etc.)
- Do NOT just repeat text → understand and summarize

Key Points:
- Important discussion point 1
- Important discussion point 2
- Important discussion point 3

Action Items:
- Owner: <name or Not specified> | Task: <clear task> | Deadline: <date or Not specified>

========================
INTELLIGENCE RULES
========================
- Understand the FULL document before summarizing
- Identify type: (meeting, report, planning, discussion, etc.)
- Remove noise, repetition, filler words
- Combine similar ideas
- Focus on decisions, outcomes, and intent
- If transcript is long → summarize globally, not line-by-line

- If no action items:
  - Owner: Not specified | Task: No action items identified | Deadline: Not specified

========================
TRANSCRIPT
========================
{transcript}
"""

    response = ollama.chat(
        model="llama3",
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]