import { generateVideo } from "./api.js";

/* =========================
   Splash → App transition
   ========================= */
const splash = document.getElementById("welcomeVideo");
const app = document.getElementById("app");

if (splash) {
  splash.addEventListener("ended", () => {
    splash.style.display = "none";
    app.classList.remove("hidden");
  });
}

/* =========================
   Video generation logic
   ========================= */
const form = document.getElementById("videoForm");
const status = document.getElementById("status");
const videoContainer = document.getElementById("videoContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  status.textContent = "Generating video...";
  videoContainer.innerHTML = "";

  const prompt = document.getElementById("prompt").value.trim();
  const image = document.getElementById("imageFile").files[0]; // (future use)

  if (!prompt) {
    status.textContent = "Please enter a prompt.";
    return;
  }

  try {
    const videoUrl = await generateVideo(prompt);

    const video = document.createElement("video");
    video.src = videoUrl;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;

    videoContainer.appendChild(video);
    status.textContent = "Video generated!";
  } catch (err) {
    console.error(err);
    status.textContent = "❌ " + err.message;
  }
});
