import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function upload() {
  const store = await ai.fileSearchStores.create({
    displayName: "Sustainability Store",
  });

  const files = fs.readdirSync("./articles");

  for (const fileName of files) {
    const file = await ai.files.upload({
      file: `./articles/${fileName}`,
      config: { mimeType: "application/pdf" },
    });

    await ai.fileSearchStores.importFile({
      fileSearchStoreName: store.name,
      fileName: file.name,
    });
  }

  console.log("STORE NAME:", store.name);
}

upload();