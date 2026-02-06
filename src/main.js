const btn = document.querySelector("#generate");
const output = document.querySelector("#output");

btn.onclick = async () => {
  btn.disabled = true;
  output.textContent = "Generating video…";

  try {
    const res = await fetch("/api/video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "make it dance c walk hiphop",
        resolution: "720p",
      }),
    });

    const data = await res.json();
    console.log("Veo response:", data);
    output.textContent = "Request sent. Check console for response.";
  } catch (e) {
    output.textContent = e.message;
  } finally {
    btn.disabled = false;
  }
};
