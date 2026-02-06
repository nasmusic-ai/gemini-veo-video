import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent(prompt);

    // ⚠️ Veo video generation is async & gated
    // This is placeholder logic
    res.status(200).json({
      videoUrl: "/welcome.mp4"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
