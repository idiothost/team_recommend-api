import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  const allowedOrigin = "https://idiothost.github.io"

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const body = req.body; // 
  if (!body) {
    return res.status(400).json({ error: "잘못된 JSON 요청입니다." });
  }

  const { style, region, type, color } = body;
  if (!style || !region || !type) {
    return res.status(400).json({ error: "응원 스타일, 지역, 팀 성향은 필수 입력입니다." });
  }

  const today = new Date().toISOString().slice(0, 10);

  const prompt = `
    오늘 날짜: ${today}
    응원 스타일: ${style}
    선호 지역: ${region}
    팀 성향: ${type}
    선호 색상: ${color || "선택 안 함"}

    이 사용자의 취향을 고려하여, 한국 프로야구 구단 중 가장 어울리는 팀을 하나 추천해 주세요.
    추천 이유와 함께 간단한 팀 소개 및 응원 메시지를 포함해 주세요. 200자 이내로 작성해주세요.`;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.8,
      },
      systemInstruction:
        "당신은 한국 프로야구 구단 추천 전문가입니다. 사용자 성향(응원 스타일, 지역, 팀 성향, 색상)을 바탕으로 가장 어울리는 KBO 구단 하나를 추천하고, 이유와 짧은 응원 문구를 포함하여 200자 이내로 답변하세요.",
    });

    console.log("AI 응답 전체:", JSON.stringify(result, null, 2)); // 

    const answer = result?.candidates?.[0]?.content?.parts?.map(p => p.text).join("").trim() || "추천 실패";

    res.status(200).json({ answer });
  } catch (err) {
    console.error("AI 호출 실패:", err);
    res.status(500).json({ error: "Gemini API 오류 발생" });
  }

}
