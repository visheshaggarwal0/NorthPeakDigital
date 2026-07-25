import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { history, message, complexity = "general" } = req.body;
      // Use gemini-3.1-pro-preview for complex tasks, gemini-3.6-flash for general
      const model = complexity === "complex" ? "gemini-3.1-pro-preview" : "gemini-3.6-flash";
      
      const contents = history.map((msg: any) => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: "user", parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: "You are the NorthPeak AI Scope Advisor. You are a highly professional, knowledgeable digital agency assistant. Help users estimate project scopes, recommend tech stacks, and answer questions about NorthPeak Digital's services (engineering, design, CRO). Be concise and conversational."
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  app.post("/api/image", async (req, res) => {
    try {
      const { prompt, imageSize = "1K" } = req.body;
      
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-image",
        contents: prompt,
        config: {
          imageConfig: {
            aspectRatio: "16:9",
            imageSize: imageSize
          }
        }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        res.json({ imageUrl });
      } else {
        res.status(500).json({ error: "Failed to extract image from response" });
      }
    } catch (error: any) {
      console.error("Image API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate image" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
