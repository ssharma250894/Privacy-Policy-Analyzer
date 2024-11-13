

async function findPrivacyPolicy(baseURL) {
  // Skip processing if the URL is an internal extension URL
  if (baseURL.startsWith("chrome-extension://")) {
      console.warn("Skipping privacy policy search for internal extension URL.");
      return null;
  }

  const potentialUrls = [
      `${baseURL}/privacy`,
      `${baseURL}/privacy-policy`,
      `${baseURL}/policies/privacy`,
      `${baseURL}/legal/privacy`,
      `${baseURL}/legal/privacy-policy`
  ];

  // Attempt the common URLs first
  for (let url of potentialUrls) {
      try {
          const response = await fetch(url, { method: 'HEAD' });
          if (response.ok) return url;
      } catch (error) {
          console.error(`Error fetching URL: ${url}`, error);
      }
  }

  // If no direct link is found, perform a deep crawl
  return await deepCrawlForPrivacyPolicy(baseURL);
}


async function analyzePolicyWithOllama(policy_text) {
    try {
        const response = await fetch("http://127.0.0.1:8000/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ policy_text })
        });

        // Check if response status is OK
        if (!response.ok) {
            console.error(`Error: Received status ${response.status}`);
            return "Error in analysis";
        }

        // Get response text for inspection
        const responseText = await response.text();
        console.log("API Response Text:", responseText);

        // Attempt to parse JSON only if responseText seems valid
        if (responseText.startsWith('{') || responseText.startsWith('[')) {
            const analysis = JSON.parse(responseText);
            return analysis.rating || "No rating available";
        } else {
            console.error("Unexpected response format:", responseText);
            return "Unexpected response format";
        }
    } catch (error) {
        console.error("Error analyzing policy text", error);
        return "Error in analysis";
    }
}



// Fetch and clean privacy policy content
async function fetchPrivacyPolicyContent(url) {
  try {
      const response = await fetch(url);
      const text = await response.text();
      return text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); // Strip HTML tags
  } catch (error) {
      console.error(`Error fetching policy content from ${url}`, error);
      return null;
  }
}

// Analyze policy with Ollama Llama 3
async function analyzePolicyWithOllama(policy_text) {
  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {  // Note '127.0.0.1' instead of 'localhost'
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ policy_text })
});

      const analysis = await response.json();
      //return analysis.rating || "No rating available";
      console.log("Full analysis response:", analysis);  // Inspect the full structure

    // Access the specific properties you need from `analysis.rating`
      return analysis
  } catch (error) {
      console.error("Error analyzing policy text", error);
      return "Error in analysis";
  }
}

// Cache ratings to avoid redundant processing
function cachePolicyRating(url, rating) {
  chrome.storage.local.set({ [url]: rating });
}

// Check cached ratings for the current URL
async function checkCachedRatings(url) {
  const cache = await chrome.storage.local.get(url);
  return cache[url];
}

// Main message handler for analyze requests
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async function handleRequest() {
      try {
          if (request.action === "analyzePolicy" && request.url) {
              const url = request.url; // The URL sent from popup.js

              // Check for a cached rating first
              //const cachedRating = await checkCachedRatings(url);
              //if (cachedRating) {
              //    sendResponse({ rating: cachedRating });
              //    return;
              //}

              // Find privacy policy URL on the specified website
              const privacyPolicyURL = await findPrivacyPolicy(url);
              if (!privacyPolicyURL) {
                  sendResponse({ rating: "No privacy policy found" });
                  return;
              }

              // Fetch privacy policy content
              const policy_text = await fetchPrivacyPolicyContent(privacyPolicyURL);
              if (!policy_text) {
                  sendResponse({ rating: "Failed to fetch policy content" });
                  return;
              }

              // Analyze the policy content and cache the rating
              const rating = await analyzePolicyWithOllama(policy_text);
             // await cachePolicyRating(url, rating);
              sendResponse({ rating });
          } else {
              sendResponse({ rating: "Invalid action or missing URL" });
          }
      } catch (error) {
          console.error("Error in handleRequest:", error);
          sendResponse({ rating: "Error in analysis" });
      }
  })();

  // Keep the message port open for async handling
  return true;
});