import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const {
      prompt,
      model = "veo-3.1-fast-generate-preview",
      aspectRatio = "16:9",
      resolution = "720p",
      imageBase64, // optional
      imageMime = "image/png",
    } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const veo = genAI.getGenerativeModel({ model });

    // IMAGE → VIDEO
    if (imageBase64) {
      const result = await veo.generateContent([
        { text: prompt },
        {
          inlineData: {
            mimeType: imageMime,
            data: imageBase64,
          },
        },
      ]);

      return res.status(200).json(result);
    }

    // TEXT → VIDEO
    const result = await veo.generateContent({
      prompt,
      aspectRatio,
      resolution,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Gemini Veo error:", err);
    res.status(500).json({ error: err.message });
  }
}
