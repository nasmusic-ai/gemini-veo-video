const welcomeVideo = document.getElementById("welcomeVideo");
const appContainer = document.getElementById("appContainer");

// Show container after splash video or skip if already seen
if (sessionStorage.getItem("splashSeen")) {
  welcomeVideo.style.display = "none";
  appContainer.style.display = "flex";
} else {
  welcomeVideo.addEventListener("ended", () => {
    welcomeVideo.style.opacity = 0;
    setTimeout(() => {
      welcomeVideo.style.display = "none";
      appContainer.style.display = "flex";
    }, 1000);
    sessionStorage.setItem("splashSeen", "true");
  });

  welcomeVideo.play().catch(() => console.log("Autoplay blocked"));
}

// Video generator form logic
const form = document.getElementById("videoForm");
const status = document.getElementById("status");
const videoContainer = document.getElementById("videoContainer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Generating video...";
  videoContainer.innerHTML = "";

  const prompt = document.getElementById("prompt").value;
  const imageFile = document.getElementById("imageFile").files[0];

  // Simulate video generation delay
  await new Promise(res => setTimeout(res, 2000));

  // Demo placeholder video
  const videoEl = document.createElement("video");
  videoEl.controls = true;
  videoEl.src = "/welcome.mp4"; // replace with actual generated video
  videoContainer.appendChild(videoEl);

  status.textContent = "Video generated!";
});
