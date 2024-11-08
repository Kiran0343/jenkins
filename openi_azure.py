import requests
import json

# Set your Azure OpenAI endpoint and key
endpoint = "https://<your-resource-name>.openai.azure.com/"
api_key = "your-api-key-here"
deployment_name = "gpt-35-turbo"  # Change based on your deployment

def call_azure_openai(prompt):
    headers = {
        "Content-Type": "application/json",
        "api-key": api_key
    }

    # Define the message structure
    data = {
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 150  # Adjust the response length as needed
    }

    # Make the API call
    response = requests.post(
        f"{endpoint}openai/deployments/{deployment_name}/chat/completions?api-version=2023-05-15",
        headers=headers,
        json=data
    )

    # Handle the response
    if response.status_code == 200:
        response_data = response.json()
        return response_data['choices'][0]['message']['content']
    else:
        return f"Error: {response.status_code}, Message: {response.text}"

# Example usage
if __name__ == '__main__':
    user_prompt = "What are the benefits of using artificial intelligence?"
    response = call_azure_openai(user_prompt)
    print(response)