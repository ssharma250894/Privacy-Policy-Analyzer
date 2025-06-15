# PrivacyIQ

The primary mechanism by which online service providers communicate their data collection and usage practices to users is privacy policies. But those policy documents tend to be long and complicated, striving for a catch-all approach that minimizes legal liability. As a result, the terms of service are invariably long and have been read without noticing it by the users by clicking button "Agree" without reading and causing privacy leakage risk and legal risks. In order to tackle this issue, this project seeks to create a Google Chrome extension which will allow for the local language large language model analysis of privacy policies, with the LLAMA3 model being specifically targeted. From automated LLMs processes, the extension will assist consumers by providing brief and comprehensible overviews of privacy policies so that they can decide on the privacy of their data. This not only improves user consciousness but also makes the internet a safer place through the provision of such automation.  

## 🧠 Key Features

- 🧩 Chrome Extension that detects and extracts privacy policies from websites.
- 🤖 Local LLM (LLaMA 3) integrated using Ollama for fast, secure, offline processing.
- 📊 Evaluates policies across **8 key categories**:
  - Data Collection
  - Data Security
  - Data Usage
  - Data Sharing
  - Data Selling
  - Opt-Out Options
  - Data Deletion
  - Ease of Understanding
- 🟢 Color-coded score (Red-Yellow-Green) for each category
- 📁 JSON-based structured prompts for consistent model output
- 🔒 Improves transparency and user privacy control

## 🔄 Architecture

![alt text](https://github.com/ssharma250894/PrivacyIQ/blob/main/Images/architecture%20diagram%206120.png)

## 🔧 Technologies Used

| Areas | Tech Stack |
|----------|------------------|
| Frontend | HTML, CSS, JavaScript (Chrome Extension APIs) |
| Backend | Python Flask |
| LLM Inference | LLaMA 3 via ollama and llama.cpp |
| Prompt Design | Structured JSON directives for category-based ratings |
| Dataset References | OPP-115, PPGDPR, PolicyGPT |
