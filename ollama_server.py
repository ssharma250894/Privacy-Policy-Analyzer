from flask import Flask, request, jsonify
import subprocess
import json
#import tempfile
import re
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB, adjust as needed

def remove_html_tags(text):
    #"""Remove HTML tags from the given text."""
    clean_text = re.sub(r'<.*?>', '', text)
    return clean_text

def analyze_with_ollama(policy_text):

    # Define the prompt for guiding the LLM
    prompt = """Give rating out of 5 based upon parameters mentioned like, Data Collection, Data Usage, Data Sharing with Third Parties, Data Selling to Third Parties, Opt-Out Options for Data Sharing, Data Security, Data Deletion, Policy Clarity and Give final rating out of 5 for this policy"""

    # Combine the prompt with the actual policy text
    full_text = prompt + policy_text
    # Remove HTML tags from input text
    #clean_text = remove_html_tags(full_text)

    # Write cleaned text to a temporary file
    # with tempfile.NamedTemporaryFile(delete=False, mode='w', suffix='.txt') as temp_file:
    #     temp_file.write(clean_text)
    #     temp_file_path = temp_file.name

    # Run the command with the temporary file path as input
    result = subprocess.run(
        ["ollama", "run", "llama3"],
        input= full_text,
        capture_output=True,
        text=True
    )

    # Check if the command executed successfully
    if result.returncode != 0:
        return f"Error running ollama: {result.stderr}"

    # Detect if output is HTML and prevent parsing non-JSON output
    if result.stdout.strip().startswith("<"):
        return "Unexpected HTML output from ollama. Please check the command or input format."

    # Parse JSON response
    try:
        analysis = json.loads(result.stdout)
        rating = analysis.get("rating", "Unknown")
    except json.JSONDecodeError:
        return f"Unexpected non-JSON output from ollama: {result.stdout}"

    return rating

# Define the /analyze route
@app.route('/analyze', methods=['POST'])
def analyze():
    # Get the policy text from the request JSON body
    data = request.get_json()
    policy_text = data.get("policy_text", "")
    
    # Check if policy_text is provided
    if not policy_text:
        return jsonify({"error": "No policy text provided"}), 400

    # Analyze the policy text
    result = analyze_with_ollama(policy_text)

   # Ensure the response includes "rating" in JSON format
    response = {"rating": result}
    ##print("Backend response:", response, flush=True)  # Debug print to check response
    logging.info(f"Backend response: {response}")
    return jsonify(response)

if __name__ == "__main__":
    app.run(port=8000, debug=True)
