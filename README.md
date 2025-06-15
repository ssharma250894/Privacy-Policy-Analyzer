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

![Architecture diagram](https://github.com/ssharma250894/PrivacyIQ/blob/main/Images/architecture%20diagram%206120.png)

## 🔧 Technologies Used

| Areas | Tech Stack |
|----------|------------------|
| Frontend | HTML, CSS, JavaScript (Chrome Extension APIs) |
| Backend | Python Flask |
| LLM Inference | LLaMA 3 via ollama and llama.cpp |
| Prompt Design | Structured JSON directives for category-based ratings |
| Dataset References | OPP-115, PPGDPR, PolicyGPT |
 
## 🚀 How to Run
```bash  
# Clone repository  
git clone   
cd privacyIQ  

# Install Dependencies for Flask Server  
cd backend
pip install -r requirements.txt
```
## 🚀 Install and Run Ollama + LLaMA 3
Make sure you have Ollama installed locally.

```bash  
ollama run llama3
```
## 🚀 Run Flask Server
```bash 
python app.py
```

##  🛠️ Load the Extension in Chrome
- Go to chrome://extensions/
- Enable Developer Mode
- Click Load unpacked
- Select the extension/ directory

## 🧪 Usage
- Open a website whose privacy policy you want to analyze.
- Click on the Privacy Policy Analyzer extension icon in the toolbar.
- Click the "Analyze" button to initiate the analysis.
- View the overall rating as stars and a detailed breakdown in the table.
- Use the "Proceed to Website" or "Go to Google Homepage" buttons for navigation.

## ⚠️ Known Issues
Half-star rendering may not work consistently in some older browsers. Performance may vary for websites with very long or complex privacy policies.

## 📈 Future Enhancements
Add multi-language support for privacy policy analysis. Improve the accuracy of the AI model. Support for downloading analysis reports. Add a dark mode for the extension UI.

##  🔍 Rationale for choosing and Categories

| Categories | Reason to choose | What it evaluates |
|------------|------------------|-------------------|
| **Data Collection** | It is essential to know which kinds of data are sourced by a service when trying to gauge the privacy threats | This category assesses the amount and type of information including demographic, psychographic or technical data that is being collected. It assists users in determining what type of data is required and convenient to the service being offered. |
| **Data Security** | It is very important to protect the gathered information from being breached and accessed by unauthorized personnel. | This category determines the policies and the methods that are adopted to protect information. It comprises the standards of access controls, encryption, and security certifications which assist users in comprehending how strong the service integrator’s security has been designed. |
| **Data Usage** | How the data is collected, and how it is used explains the existing privacy threat and the service’s data protection compliance. | This perspective looks at the possibilities of which data collected may satisfy specific needs such as improving the service, tailoring it to a specific user, or advertising. It sheds light on whether the data usage is in accordance with user expectations and legal provisions. |
| **Data Sharing with Third Parties** | Sharing data with third parties exposes even more privacy risks. | This category investigates user’s circumstances under which user data collected have been shared with external entities. It assists users to know who else has access to their data and the purpose in order to assess risk factors associated with third parties. |
| **Data Selling with Third Parties** | This is because privacy-concerned users may find it hard to compromise with user data being sold. | This category assesses the extent to which user data may be sold to third parties and the circumstances in which this may be permitted. It uses a commercial viewpoint of data treatment practices, which the user dislikes. |
| **Opt-out Options** | It's one of the fundamental privacy rights of users to be able to control their information. | This category evaluates the mechanisms available and ways users can opt-out and give their consent on the collection, utilization, and sharing of data. | It determines whether users are given the option to refuse or revoke the permission given, thereby increasing protection over personal information.|
| **Data Deletion** | If a person does not control the right to delete information, then this information is not theirs in practical terms, and on theoretical, it only exists printed on a sheet of paper. | This category focuses on the existing policies and practices with regard to data deletion requests. It also measures the ability of users to wipe their data from the system, which is desirable in order to meet the EU’s General data protection regulations. |
| **Ease of Understanding** | Users do not bother to read the privacy policies if they are lengthy and filled with technical details, thus the whole purpose of informed consent is lost. | This category assesses the comprehensibility, legibility and conciseness of the privacy policy. It ensures that the language of the document is simple enough for the average user and thus such a user will be able to make informed choices about the privacy of his or her personal data. |


## ✏️ Prompt Enginnering

In this project, we developed a structured prompt interface that assists in the assessment of privacy policies. The schema has a well-defined structured JSON that helps the model in the stepwise evaluation of certain attributes which will improve the accuracy and comprehensiveness of the outcomes. All the parameters are analyzed separately, and emphasis placed on giving a score as well as justifying it. Prompt generation represents a structured Prompt Design framework created to guide a Language Learning Model (LLM) in performing evaluations. The framework is divided into three main components. 

| Componets | Description |
|-----------|-------------|
| **Directive Schema** | It outlines the primary instructions, asking the model to produce a JSON-formatted output that includes ratings and explanations for specific parameters, along with an overall rating and explanation. |
| **Parameterized Schema** | It details the structure of the evaluation. It identifies categories such as Data Collection, Data Usage, and Policy Clarity, among others. For each category, the model is instructed to provide a numerical rating (e.g., out of 5) and a detailed explanation justifying the rating. This ensures clarity and uniformity in the model's output. |
| **Aggregated Assessment** | It consolidates the individual evaluations into a single overall rating with an accompanying explanation. This step provides a high-level summary, making the output concise and actionable. Together, these components create a comprehensive and systematic framework to ensure the LLM produces meaningful and consistent results. |

<p align="center">
<img src="https://github.com/ssharma250894/PrivacyIQ/blob/main/Images/Prompt%206120.png">
</p>
  ![Prompt Engineering Framework]()

## 📚 References
- [PolicyGPT Paper (2023)](chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://arxiv.org/pdf/2309.10238)
- [OPP-115 Dataset](https://www.usableprivacy.org/data)
- [PPGDPR Dataset](https://arxiv.org/html/2503.10727v1)
- [LaMA 3 Herd of Models (Meta, 2024)](https://arxiv.org/abs/2407.21783)
