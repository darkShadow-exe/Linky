import { Client } from "https://esm.sh/@gradio/client";

async function checkLink() {
  const userInput = document.getElementById("urlInput").value.trim();
  const resultDisplay = document.getElementById("result");
  const loadingBar = document.getElementById("loadingBar");
  const saveBtn = document.getElementById("saveBtn");

  if (!userInput) return alert("Please enter a URL.");

  loadingBar.classList.remove("hidden");
  resultDisplay.textContent = "";
  saveBtn.classList.add("hidden");

  try {
    const client = await Client.connect("darkShadow-exe/LinkyAPI");
    const result = await client.predict("/predict", {
      user_url: userInput,
    });

    resultDisplay.textContent = `Scan Result: ${result.data}`;
    resultDisplay.style.color = result.data.includes("safe") ? "var(--success)" : "var(--danger)";
    saveBtn.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    resultDisplay.textContent = "Error: Could not fetch result.";
    resultDisplay.style.color = "var(--danger)";
  } finally {
    loadingBar.classList.add("hidden");
  }
}

// Save to sidebar
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = document.getElementById("result").textContent;
  const list = document.getElementById("savedResults");
  const li = document.createElement("li");
  li.textContent = result;
  list.appendChild(li);
});

// Expose checkLink globally
window.checkLink = checkLink;
