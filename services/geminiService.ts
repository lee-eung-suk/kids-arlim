import { GoogleGenAI, Type } from "@google/genai";
import { ActivityResult } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateActivityContent = async (
  childName: string,
  base64Image: string
): Promise<ActivityResult> => {
  try {
    // Remove header from base64 string if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const prompt = `
      이 사진 속 아이의 활동을 분석해주세요. 
      아이의 이름은 '${childName}'입니다.
      
      다음 두 가지를 포함한 JSON을 생성해주세요:
      1. title: 활동을 요약하는 귀여운 제목 (예: "모래놀이에 집중해요!", "즐거운 간식 시간").
      2. message: 학부모님께 보낼 따뜻하고 긍정적인 알림장 멘트. 3줄 정도로 작성해주세요. 말투는 '~~했답니다', '~~보였어요' 처럼 친절하고 부드러운 유치원 선생님 말투(존댓말)를 사용해주세요. 이모지도 적절히 섞어주세요.
      
      응답은 오직 JSON 형식이어야 합니다.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            message: { type: Type.STRING },
          },
          required: ["title", "message"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const json = JSON.parse(text);
    return json as ActivityResult;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("알림장을 생성하는 도중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
  }
};