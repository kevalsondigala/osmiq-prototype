import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing. Please provide a valid API key in your .env file.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateChatResponse = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[],
  contextFiles: string[] = [],
  useSearch: boolean = false
): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Error: API Key missing.";

  try {
    const model = "gemini-3-flash-preview";
    
    let systemInstruction = "You are Osmiq, a helpful and encouraging AI study assistant for students. Keep answers concise, educational, and easy to understand.";
    
    if (contextFiles.length > 0) {
      systemInstruction += `\n\nContext from user files:\n${contextFiles.join('\n')}`;
    }

    const tools = useSearch ? [{ googleSearch: {} }] : [];

    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction,
        tools: tools,
      },
      history: history, 
    });

    const result = await chat.sendMessage({ message });
    
    let responseText = result.text || "I couldn't generate a response.";

    // Append grounding sources if available
    const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks && groundingChunks.length > 0) {
      const sources = groundingChunks
        .map((chunk: any) => chunk.web?.uri)
        .filter((uri: string) => uri) // Filter out undefined/null
        .map((uri: string) => `• ${uri}`)
        .join('\n');
      
      if (sources) {
        responseText += `\n\n**Sources:**\n${sources}`;
      }
    }

    return responseText;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};

export const generateSurpriseTest = async (): Promise<any> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const prompt = `Generate a short surprise test for a high school student. 
  Include 3 Multiple Choice Questions (MCQs) and 1 Subjective question.
  Topic: General Science and Mathematics mix.
  
  Return ONLY valid JSON with this structure:
  {
    "title": "Weekly Surprise Test",
    "subject": "General Knowledge",
    "durationMinutes": 10,
    "questions": [
      {
        "id": "1",
        "type": "MCQ",
        "text": "Question text here",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correctAnswer": "Option A",
        "marks": 1
      },
      {
        "id": "4",
        "type": "SUBJECTIVE",
        "text": "Question text here",
        "marks": 5
      }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Test Gen Error:", error);
    throw error;
  }
};

export const generateProjectIdeas = async (subject: string, topic: string): Promise<any> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const prompt = `Suggest 3 academic project ideas for a student.
  Subject: ${subject}
  Specific Topic/Interest: ${topic}
  
  Return valid JSON. Structure:
  [
    {
      "title": "Project Title",
      "description": "Short description",
      "steps": ["Step 1", "Step 2"],
      "materials": ["Item 1", "Item 2"]
    }
  ]`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Project Gen Error:", error);
    return [];
  }
};

export const generateProjectReport = async (title: string, description: string): Promise<any> => {
  const ai = getAiClient();
  if (!ai) throw new Error("API Key missing");

  const prompt = `Create a detailed project report draft for: "${title}".
  Description: ${description}.
  
  Return valid JSON with keys:
  - processDescription (string, summary of how it works)
  - executionSteps (array of strings, detailed)
  - materials (array of strings)
  - estimatedCost (string, e.g. "$20-30")
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Project Report Gen Error:", error);
    return null;
  }
};

export const evaluateSubjectiveAnswer = async (question: string, answer: string): Promise<{score: number, feedback: string}> => {
   const ai = getAiClient();
  if (!ai) return { score: 0, feedback: "Error connecting to AI" };

  const prompt = `Evaluate the following student answer for the question: "${question}".
  Student Answer: "${answer}".
  Provide a score out of 5 and brief feedback.
  Return JSON: { "score": number, "feedback": "string" }`;

  try {
     const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || '{"score": 0, "feedback": "Error parsing"}');
  } catch (error) {
    return { score: 0, feedback: "Evaluation failed." };
  }
}