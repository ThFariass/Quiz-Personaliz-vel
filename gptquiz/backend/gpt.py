import openai

openai.api_key = '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'

def get_questions(theme):
    response = openai.Completion.create(
        engine="davinci",
        prompt=f"Generate a quiz question about {theme}",
        max_tokens=150,
        n=5,
        stop=None,
        temperature=0.5,
    )
    questions = [choice['text'].strip() for choice in response.choices]
    return questions


# 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