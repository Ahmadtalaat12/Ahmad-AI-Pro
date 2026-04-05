from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# حط المفتاح بتاعك هنا بين العلامتين
genai.configure(api_key="AIzaSyArYOMa9SjfzDfL12_n3s83Z2EA13YOKOQ")
model = genai.GenerativeModel('gemini-1.5-flash')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_message = request.form['message']
    # هنا بنبعت السؤال لجوجل وناخد الرد
    response = model.generate_content(user_message)
    return jsonify({'reply': response.text})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
