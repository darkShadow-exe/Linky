import { Client } from "https://esm.sh/@gradio/client";

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r
  }, '');
}

function loadSavedResults() {
  const saved = getCookie('savedResults');
  if (saved) {
    try {
      const results = JSON.parse(saved);
      const list = document.getElementById("savedResults");
      list.innerHTML = '';
      results.forEach(res => {
        const li = document.createElement("li");
        li.textContent = res;
        list.appendChild(li);
      });
    } catch {
      // ignore JSON parse errors
    }
  }
}

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

    // Clean URL for output (remove http://, https:// and trailing /)
    const simplifiedURL = userInput.replace(/^https?:\/\//, '').replace(/\/$/, '');

    const output = result.data?.[0] ?? result.data;

    if (output === 1 || output === "1") {
      resultDisplay.textContent = `${simplifiedURL} is a Good Link`;
      resultDisplay.style.color = "var(--success)";
    } else if (output === 0 || output === "0") {
      resultDisplay.textContent = `${simplifiedURL} is a Bad Link`;
      resultDisplay.style.color = "var(--danger)";
    } else {
      resultDisplay.textContent = `${simplifiedURL}: ${output}`;
      resultDisplay.style.color = "var(--danger)";
    }

    saveBtn.classList.remove("hidden");

  } catch (err) {
    console.error(err);
    resultDisplay.textContent = "Error: Could not fetch result.";
    resultDisplay.style.color = "var(--danger)";
  } finally {
    loadingBar.classList.add("hidden");
  }
}

// Save to sidebar and cookies
document.getElementById("saveBtn").addEventListener("click", () => {
  const result = document.getElementById("result").textContent;
  const list = document.getElementById("savedResults");
  const li = document.createElement("li");
  li.textContent = result;
  list.appendChild(li);

  // Save all results in cookie
  const results = Array.from(list.children).map(li => li.textContent);
  setCookie('savedResults', JSON.stringify(results), 7); // expires in 7 days
});

// Clear all saved results
document.getElementById("clearSavedBtn").addEventListener("click", () => {
  const list = document.getElementById("savedResults");
  list.innerHTML = '';
  setCookie('savedResults', JSON.stringify([]), 7);
});

// Load saved results on page load
window.addEventListener('load', loadSavedResults);

// Expose checkLink globally
window.checkLink = checkLink;
