
import { GoogleGenAI, Type } from "@google/genai";
import { Flashcard } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateFlashcards = async (topic: string, count: number): Promise<Flashcard[]> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a list of exactly ${count} important terms and their brief definitions for the topic: "${topic}". The definitions should be concise and easy to understand.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: {
                type: Type.STRING,
                description: "The term or concept name.",
              },
              definition: {
                type: Type.STRING,
                description: "A brief introductory explanation of the term.",
              },
            },
            required: ["term", "definition"],
          },
        },
      },
    });

    const jsonStr = response.text.trim();
    const data = JSON.parse(jsonStr);
    
    return data.map((item: any, index: number) => ({
      id: `card-${Date.now()}-${index}`,
      term: item.term,
      definition: item.definition,
    }));
  } catch (error) {
    console.error("Error generating flashcards:", error);
    throw new Error("Failed to generate flashcards. Please try again.");
  }
};
