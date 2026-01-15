
import { GoogleGenAI } from "@google/genai";

export const calculateDistance = async (origen: string, destino: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Actúa como un GPS preciso en Valencia, España. Calcula la distancia de conducción más rápida entre "${origen}, Valencia" and "${destino}, Valencia". Responde SOLAMENTE con el número seguido de "km" (ejemplo: 5.4 km).`,
    config: {
      temperature: 0.1, // Keep it deterministic
      systemInstruction: "Eres un asistente experto en logística y navegación para Valencia, España. Proporcionas distancias de conducción realistas basadas en el callejero de la ciudad."
    }
  });

  const text = response.text || "";
  const match = text.match(/(\d+[.,]?\d*)\s*km/i) || text.match(/(\d+[.,]?\d*)/);
  
  if (match) {
    const num = match[1].replace(',', '.');
    return `${num} km`;
  }
  
  throw new Error("Respuesta de IA no válida.");
};
