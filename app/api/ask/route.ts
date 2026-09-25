import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { mockMeetings } from "@/lib/mock-data";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Question is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured in environment." },
        { status: 500 }
      );
    }

    // Build comprehensive context from all mock meetings in lib/mock-data.ts
    const meetingsContext = mockMeetings
      .map((m) => {
        const participants = m.participants
          .map((p) => `${p.name} (${p.role || "Attendee"})`)
          .join(", ");
        const summaries = m.summary
          .map((s) => `- [${s.category || "Recap"}] ${s.text}`)
          .join("\n");
        const actionItems = m.actionItems
          .map(
            (a) =>
              `- [${a.isDone ? "Done" : "Pending"}] ${a.text} (Assignee: ${
                a.assignee || "Unassigned"
              }, Due: ${a.dueDate || "N/A"})`
          )
          .join("\n");
        const transcript = m.transcript
          .map(
            (t) =>
              `[${Math.floor(t.timestampSeconds / 60)}:${(
                t.timestampSeconds % 60
              )
                .toString()
                .padStart(2, "0")}] ${t.speakerName}: ${t.text}`
          )
          .join("\n");

        return `=== MEETING: "${m.title}" (Date: ${m.date}, Duration: ${m.durationMinutes} mins) ===
Participants: ${participants}

Key Summary Takeaways:
${summaries}

Action Items:
${actionItems}

Full Transcript:
${transcript}`;
      })
      .join("\n\n");

    const genAI = new GoogleGenerativeAI(apiKey);

    const systemInstruction = `You are Fanthom AI, an intelligent meeting assistant.
Answer the user's question ONLY based on the provided meeting data (transcripts, summaries, action items).
Cite which meeting title the answer came from.
If the answer is not in the data, respond with: "I don't see that in your meetings."
Be concise, accurate, and professional.

At the very end of your response, on a new line, add:
SOURCE_MEETING: [Exact Meeting Title]
(or SOURCE_MEETING: None if the question asks across multiple meetings or was not found).`;

    const prompt = `Here is the meeting records archive:\n\n${meetingsContext}\n\nUser Question: ${question}\n\nAnswer:`;

    // Try models in order: "gemini-2.5-flash" (as requested in spec), then "gemini-3.7-flash", then "gemini-3.8-flash", then "gemini-flash-latest"
    const candidateModels = [
      "gemini-2.5-flash",
      "gemini-3.7-flash",
      "gemini-3.8-flash",
      "gemini-flash-latest",
    ];

    let responseText = "";
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
        });

        const result = await model.generateContent(prompt);
        responseText = result.response.text();
        if (responseText) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} failed, trying next candidate:`, err?.message);
      }
    }

    if (!responseText) {
      throw lastError || new Error("Failed to generate response from Gemini API");
    }

    // Extract SOURCE_MEETING metadata tag
    let sourceMeetingTitle: string | undefined = undefined;
    const sourceMatch = responseText.match(/SOURCE_MEETING:\s*(.+)$/m);
    if (sourceMatch) {
      const rawTitle = sourceMatch[1].trim();
      responseText = responseText.replace(/SOURCE_MEETING:\s*(.+)$/m, "").trim();

      if (rawTitle && rawTitle.toLowerCase() !== "none") {
        const matched = mockMeetings.find(
          (m) =>
            m.title.toLowerCase().includes(rawTitle.toLowerCase()) ||
            rawTitle.toLowerCase().includes(m.title.toLowerCase())
        );
        sourceMeetingTitle = matched ? matched.title : rawTitle;
      }
    } else {
      // Auto-detect known meeting title if cited directly in answer
      for (const m of mockMeetings) {
        if (responseText.includes(m.title)) {
          sourceMeetingTitle = m.title;
          break;
        }
      }
    }

    return NextResponse.json({
      answer: responseText,
      sourceMeetingTitle,
    });
  } catch (error: any) {
    console.error("API /api/ask error:", error);
    return NextResponse.json(
      { error: "Something went wrong, try again", details: error?.message },
      { status: 500 }
    );
  }
}
