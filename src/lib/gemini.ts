import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenAI({
  apiKey: apiKey,
});

export async function generateFormula(
  prompt: string,
  platform: "google-sheets" | "excel" | "both"
): Promise<{ formula: string; explanation: string }> {
  let platformText = "";
  if (platform === "both") {
    platformText =
      "both Google Sheets and Microsoft Excel (if different, provide the most compatible one or specify)";
  } else {
    platformText =
      platform === "google-sheets" ? "Google Sheets" : "Microsoft Excel";
  }

  const fullPrompt = `
    You are an expert at writing spreadsheet formulas.
    User request: "${prompt}"
    Platform: ${platformText}

    Return a JSON object with the following fields:
    - "formula": The spreadsheet formula (starting with =).
    - "explanation": A brief explanation of how the formula works.

    If the request is invalid, return "formula": "ERROR", "explanation": "Cannot generate formula".
  `;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating formula:", error);
    throw new Error("Failed to generate formula");
  }
}
