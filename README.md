# COMP308 Lab 5 – RAG Sustainability Report

## Overview

This project implements a Retrieval-Augmented Generation (RAG) application to analyze sustainability reports from major technology companies (Amazon AWS, Microsoft, and Google).

The system allows users to upload articles, store them in a vector database, and generate AI-powered summaries and insights using a Large Language Model (LLM). The goal is to demonstrate how AI can support sustainability analysis while handling real-world data.

---

## Objectives

- Analyze the environmental impact of emerging technologies
- Explore sustainability initiatives by major software companies
- Use an LLM API (Gemini) to generate summaries and insights
- Implement a working RAG pipeline (upload → retrieve → generate)
- Provide a simple UI/API for running the summarizer

---

## Technologies Used

- **Node.js**
- **JavaScript**
- **Gemini API (LLM)**
- **FAISS / Vector Store (or equivalent)**
- **Express (server)**
- **dotenv**

---

## Setup Instructions

1. **Install dependencies**

```bash
npm install
```

2. **Add your Gemini API key**

Create a `.env` file and add:

```bash
GEMINI_API_KEY=your_api_key_here
```

3. **Upload articles to vector store**

```bash
node upload-files.js
```

4. **Configure store name**

- Open `rag-report.js`
- Paste the generated store name

5. **Run the server**

```bash
node server.js
```

---

## How It Works

1. Upload articles (PDF/text)
2. System creates embeddings and stores them in a vector database
3. User submits a query
4. Relevant content is retrieved using similarity search
5. Gemini LLM generates a summary/analysis
6. Results are returned via API/UI

---

## Testing & Validation

- Tested with sustainability reports from AWS, Microsoft, and Google
- Verified retrieval returns relevant chunks
- Checked summaries against original content for accuracy and coherence

---

## Key Features

- Retrieval-Augmented Generation (RAG)
- Context-aware summaries
- Separation of retrieval and generation logic
- Simple API/UI for running the summarizer

---

## Notes

- Add `.env` to `.gitignore`
- Remove `node_modules` before submission

---

## 👥 Group Members

(Add names here)

---

## References

- Amazon Web Services Sustainability Report
- Microsoft Environmental Sustainability Report
- Google Environmental Report
