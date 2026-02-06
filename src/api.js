export async function generateVideo(prompt) {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "API failed");
  }

  if (!data.videoUrl) {
    throw new Error("No video URL returned");
  }

  return data.videoUrl;
}
