const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const resultContainer = document.getElementById('resultContainer');
const resultPre = document.getElementById('result');
const clearResultBtn = document.getElementById('clearResult');

const COOKIE_NAME = 'linkyapi_result';

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function displayResult(text) {
    resultPre.textContent = text;
    resultContainer.classList.remove('hidden');
}

async function vectorizeUrl(url) {
    try {
        const response = await fetch('https://hf.space/embed/darkShadow-exe/LinkyAPI/api/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_url: url })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const json = await response.json();
        if (json && json.data) {
            return json.data;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    if (!url) return;

    displayResult('Loading...');
    const result = await vectorizeUrl(url);
    displayResult(result);
    setCookie(COOKIE_NAME, result, 7);
});

clearResultBtn.addEventListener('click', () => {
    deleteCookie(COOKIE_NAME);
    resultPre.textContent = '';
    resultContainer.classList.add('hidden');
});

window.addEventListener('load', () => {
    const savedResult = getCookie(COOKIE_NAME);
    if (savedResult) {
        displayResult(savedResult);
    }
});
