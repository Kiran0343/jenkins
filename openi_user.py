import openai

# Set your API key
openai.api_key = 'your-api-key-here'

def call_openai_model(prompt):
    try:
        # Make a call to the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or "gpt-4" if you have access
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract and return the response text
        return response.choices[0].message['content']
    
    except Exception as e:
        return str(e)

# Example usage
if __name__ == '__main__':
    user_prompt = "What are the benefits of using artificial intelligence?"
    response = call_openai_model(user_prompt)
    print(response)