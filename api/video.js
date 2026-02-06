import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    if (req.method === "POST") {
      // NEW video generation
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

      let result;

      if (imageBase64 && imageBase64.length > 0) {
        // IMAGE → VIDEO
        result = await veo.generateContent([
          { text: prompt },
          {
            inlineData: {
              mimeType: imageMime,
              data: imageBase64,
            },
          },
        ]);
      } else {
        // TEXT → VIDEO
        result = await veo.generateContent({
          prompt,
          aspectRatio,
          resolution,
        });
      }

      // Return the job info (id or output)
      return res.status(200).json(result);
    } else if (req.method === "GET") {
      // POLLING: check video status by jobId
      const { jobId } = req.query;
      if (!jobId) {
        return res.status(400).json({ error: "jobId is required" });
      }

      const veo = genAI.getGenerativeModel({ model: "veo-3.1-fast-generate-preview" });

      // Fetch job status
      const status = await veo.getJob(jobId);

      res.status(200).json(status);
    } else {
      res.setHeader("Allow", ["POST", "GET"]);
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.error("Gemini Veo error:", err);
    res.status(500).json({ error: err.message });
  }
}
