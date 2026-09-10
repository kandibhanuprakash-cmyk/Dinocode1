from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError("GEMINI_API_KEY is not set")

client = genai.Client(api_key=api_key)


@app.route("/")
def home():
    return render_template("codewithdino.html")


@app.route("/home")
def home_page():
    return render_template("codewithdino.html")


@app.route("/course")
def course():
    return render_template("courses.html")


@app.route("/roadmap")
def roadmap():
    return render_template("roadmap.html")


@app.route("/aibot")
def aibot():
    return render_template("dinoai.html")


@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid request"
        }), 400

    user_message = data.get("message", "").strip()
    history = data.get("history", [])

    if not user_message:
        return jsonify({
            "error": "Message is required"
        }), 400

    try:

        formatted_history = []

        for msg in history:

            if not isinstance(msg, dict):
                continue

            role = msg.get("role")
            text = msg.get("text", "")

            if role not in ["user", "model"]:
                continue

            if not text:
                continue

            formatted_history.append(
                types.Content(
                    role=role,
                    parts=[
                        types.Part.from_text(text=text)
                    ]
                )
            )

        chat_session = client.chats.create(
            model="gemini-2.5-flash",
            history=formatted_history
        )

        response = chat_session.send_message(user_message)

        return jsonify({
            "response": response.text
        })

    except Exception as e:

        print("Gemini Error:", repr(e))

        return jsonify({
            "error": "Dino AI could not generate a response."
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
