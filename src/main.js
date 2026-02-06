import { generateVideo } from "./api.js";

const splash = document.getElementById("welcomeVideo");
const app = document.getElementById("app");

splash.addEventListener("ended", () => {
  splash.style.display = "none";
  app.classList.remove("hidden");
});

const form = document.getElementById("videoForm");
const status = document.getElementById("status");
const videoContainer = document.getElementById("videoContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Generating video...";
  videoContainer.innerHTML = "";

  const prompt = document.getElementById("prompt").value;
  const image = document.getElementById("imageFile").files[0];

  const videoUrl = await generateVideo(prompt, image);

  const video = document.createElement("video");
  video.src = videoUrl;
  video.controls = true;
  videoContainer.appendChild(video);

  status.textContent = "Done!";
});
