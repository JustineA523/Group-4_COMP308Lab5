import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const FILE_SEARCH_STORE = "fileSearchStores/2yfmyvh5ibvp-n169yuapibg8";

const MODEL_NAME = "gemini-3-flash-preview";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithRetry(maxAttempts = 5) {
  const prompt = `
You are helping with a college report on the environmental impact of emerging software technologies.

Using the uploaded article as retrieved context, generate:

1. A short summary of the article
2. A short critical analysis
3. The main environmental concerns discussed
4. Any sustainable solutions mentioned
5. 5 bullet points I can use in my report
6. A short conclusion

Keep the writing clear, simple, and academic.
`;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxAttempts}...`);

      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: prompt,
        config: {
          tools: [
            {
              fileSearch: {
                fileSearchStoreNames: [FILE_SEARCH_STORE],
              },
            },
          ],
        },
      });

      return response.text || "No response returned.";
    } catch (error) {
      const status = error?.status;

      if (status === 503 && attempt < maxAttempts) {
        const waitMs = attempt * 5000;
        console.log(`Model busy (503). Retrying in ${waitMs / 1000} seconds...`);
        await sleep(waitMs);
      } else {
        throw error;
      }
    }
  }
}

async function generateRagReport() {
  try {
    const text = await generateWithRetry();

    if (!fs.existsSync("outputs")) {
      fs.mkdirSync("outputs");
    }

    const outputPath = path.join("outputs", "rag-report.md");
    fs.writeFileSync(outputPath, text, "utf-8");

    console.log("RAG report generated successfully.");
    console.log(`Saved to: ${outputPath}`);
    console.log("\nPreview:\n");
    console.log(text);
  } catch (error) {
    console.error("RAG generation failed:");
    console.error(error);
  }
}

generateRagReport();