from flask import Flask, request, jsonify, render_template
from backend.mentalbot import chat_with_bot

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat')
def chat_page():
    return render_template('chat.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        message = request.json.get('message')
        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Get response from mentalbot
        chat_response = chat_with_bot(message)
        
        # Add a small delay to ensure loading indicator is visible (optional)
        # import time
        # time.sleep(0.5)
        
        return jsonify({'response': chat_response['response']})
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
