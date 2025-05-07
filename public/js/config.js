// Allow printing only if admin is authenticated
window.onbeforeprint = function () {
    if (!isAdminAuthenticated) {
        alert("Printing is disabled on this application.");
        setTimeout(() => window.stop(), 100); // Stop printing
    }
};

// Disable Ctrl + P unless admin is logged in
window.addEventListener("keydown", function (event) {
    if (!isAdminAuthenticated && event.ctrlKey && event.key === "p") {
        alert("Printing is disabled.");
        event.preventDefault();
    }
});
// Disable right-click and clipboard actions
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
document.addEventListener("cut", e => e.preventDefault());
document.addEventListener("paste", e => e.preventDefault());
// Block key combinations for DevTools and source code access
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 123 ||  // F12
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.key === "U")) {  // Ctrl+U (View Source)
      e.preventDefault();
    }
});
// Improved DevTools Detection (no crashing)
setInterval(() => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > 250 || heightDiff > 250) { // Larger threshold to avoid false positives
        console.warn("DevTools Detected! Redirecting...");
        setTimeout(() => window.location.href = "https://aokfoundation.org", 2000);
    }
}, 3000);
const allowedDomains = [
    "daygea.github.io/Nature", 
    "nature.aokfoundation.org" 
];
const userAgent = navigator.userAgent.toLowerCase();
const isLocal = location.protocol === "file:" || 
                location.hostname === "localhost" || 
                location.hostname === "127.0.0.1" || 
                allowedDomains.includes(location.hostname.toLowerCase());
// List of bot-like User-Agents
const botUserAgents = [
    "bot", "crawler", "spider", "Scrapy", "Python-urllib", "requests", "curl", "wget", "headless", "selenium", "phantomjs"
];
// Detect bots based on User-Agent
if (!isLocal && botUserAgents.some(bot => userAgent.includes(bot))) {
    console.warn("Bot detected! Blocking access...");
    setTimeout(() => window.location.href = "https://aokfoundation.org", 2000);
}
// Detect headless browsers
if (!isLocal && navigator.webdriver) {
    console.warn("Headless browser detected! Blocking access...");
    setTimeout(() => window.location.href = "https://aokfoundation.org", 2000);
}
// Prevent requests without JavaScript execution
document.addEventListener("DOMContentLoaded", function () {
    if (!isLocal && (!window.location || !navigator.userAgent)) {
        console.warn("Suspicious request detected! Blocking...");
        setTimeout(() => window.location.href = "https://aokfoundation.org", 2000);
    }
});
// Block bot-like direct requests (only for suspicious cases)
setTimeout(() => {
    if (!isLocal && document.referrer === "" && botUserAgents.some(bot => userAgent.includes(bot))) {
        console.warn("No referrer, likely bot! Blocking...");
        setTimeout(() => window.location.href = "https://aokfoundation.org", 2000);
    }
}, 500);
// Prevent console access (but without crashing)
(function () {
    if (!isLocal) {
        // Overwrite console methods to prevent access
        ["log", "info", "warn", "error", "debug"].forEach(method => {
            console[method] = function () {
                // Do nothing to block console output
            };
        });

        // Optional: Display a warning message when DevTools is open
        Object.defineProperty(console, '_commandLineAPI', {
            get: function () {
                throw new Error("Unauthorized console access detected.");
            }
        });
    }
})();

const SERVER_CANDIDATES = [
  "http://localhost:10000",
  "https://ancestra-nhhh.onrender.com", 
  // "https://ancestra.fly.dev"
];

// Current active server
let SERVER_URL = SERVER_CANDIDATES[SERVER_CANDIDATES.length - 1]; // Start with fallback
let isCheckingServer = false;

// Health check with retries
const checkServer = async (url) => {
  try {
    const res = await fetch(`${url}/api/ping`, {
      signal: AbortSignal.timeout(3000)
    });
    return res.ok;
  } catch {
    return false;
  }
};

// Find first working server (with retries)
const updateActiveServer = async () => {
  if (isCheckingServer) return;
  isCheckingServer = true;
  
  for (const url of SERVER_CANDIDATES) {
    if (await checkServer(url)) {
      if (SERVER_URL !== url) {

        console.log(`Switched to ${url}`);
        SERVER_URL = url;
      }
      break;
    }
  }
  
  isCheckingServer = false;
};

// Background health checks (every 30 seconds)
setInterval(updateActiveServer, 30000);

// Initialize on startup
(async () => {
  await updateActiveServer();
  console.log("Initial server:", SERVER_URL);
})();