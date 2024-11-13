document.getElementById("analyzeButton").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    chrome.runtime.sendMessage({ action: "analyzePolicy", url: tab.url }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error in sendMessage:", chrome.runtime.lastError);
            document.getElementById("result").textContent = "Error: No response received.";
        } else if (response && response.rating) {
            document.getElementById("result").textContent = `Rating: ${response.rating}`;
        } else {
            document.getElementById("result").textContent = "Error: Could not retrieve rating.";
        }
    });
});
