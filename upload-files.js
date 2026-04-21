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

async function uploadArticlesToStore() {
  try {
    const articlesDir = path.join(process.cwd(), "articles");
    const files = fs.readdirSync(articlesDir).filter((file) =>
      file.toLowerCase().endsWith(".pdf")
    );

    if (files.length === 0) {
      console.error("No PDF files found in /articles");
      process.exit(1);
    }

    const store = await ai.fileSearchStores.create({
      displayName: "Emerging Tech Sustainability Store",
    });

    console.log("Created store:");
    console.log(store);

    for (const fileName of files) {
      const fullPath = path.join(articlesDir, fileName);

      const file = await ai.files.upload({
        file: fullPath,
        config: {
          mimeType: "application/pdf",
        },
      });

      console.log(`Uploaded file to Gemini: ${file.name}`);
e
      const operation = await ai.fileSearchStores.importFile({
        fileSearchStoreName: store.name,
        fileName: file.name,
      });

      console.log(`Imported into store: ${fileName}`);
      console.log(operation);
    }

    console.log("\nIMPORTANT:");
    console.log("Copy this store name for rag-report.js:");
    console.log(store.name);
  } catch (error) {
    console.error("Upload failed:");
    console.error(error);
  }
}

uploadArticlesToStore();