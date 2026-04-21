import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { generateWithRetry } from "./rag-report.js";

const app = express();
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/generate", async (req, res) => {
  try {
    const result = await generateWithRetry();
    res.send(result);
  } catch (err) {
    res.status(500).send("Error generating report");
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});