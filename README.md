# 인터넷 기초[04] 과제2 - 나만의 인공지능 서비스 백엔드

## 개요

- [야구 구단 추천 AI](https://idiothost.github.io/team_recommend/) 서비스를 위한 백엔드 프로젝트입니다.
- 사용자의 응원 스타일, 선호 지역, 팀 성향 등을 기반으로 Google Gemini API를 통해 어울리는 KBO 구단을 추천합니다.
- 프론트엔드에서 요청을 받아 AI 응답을 생성하고, 그 결과를 JSON 형태로 반환합니다.

---

## 주요 기능

- 사용자의 취향을 받아 AI에게 프롬프트로 전달
- Google Gemini 1.5 Flash 모델을 활용한 팀 추천 생성
- 200자 이내의 간단한 구단 추천 이유 및 응원 메시지를 응답

---

## 기술 스택

- Node.js
- Vercel Function (`api/baseballAI.js`)
- Google Generative AI (`@google/genai`)

---

## 디렉토리 구조

**team_recommend-api/**<br>
├── api/<br>
│ └── baseballAI.js # 백엔드 API (Vercel용)<br>
├── .env # 환경변수 파일 (API 키 등)**team_recommend-api/<br>
├── .env<br>
├── package.json<br>
├── package-lock.json<br>
└── README.md<br>

