from flask import Flask, request, jsonify
from gpt import get_questions

app = Flask(__name__)

@app.route('/get-questions', methods=['GET'])
def get_questions_route():
    theme = request.args.get('theme', default='general', type=str)
    print(f"Recebido tema: {theme}")
    questions = get_questions(theme)
    print(f"Perguntas geradas: {questions}")
    return jsonify(questions)

if __name__ == '__main__':
    app.run(debug=True)
