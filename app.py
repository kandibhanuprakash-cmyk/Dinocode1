from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

app = Flask(__name__)
client = genai.Client(api_key="AQ.Ab8RN6KvWfdv708tn4QS6PEBb0rilRX5eAeCnL2HF94ClAf-Iw")
@app.route("/")
def home():
    return render_template("codewithdino.html")
@app.route("/course")
def course():
    return render_template("courses.html")
@app.route("/home")
def about():
    return render_template("codewithdino.html")
@app.route("/roadmap")
def roadmap():
    return render_template("roadmap.html")
@app.route("/aibot")
def aibot():
    return render_template("dinoai.html")


@app.route("/api/chat", methods=["POST"])
def chat():

    data = request.get_json()

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

            role = msg.get("role")

            text = msg.get("text", "")

            if role not in ["user", "model"]:
                continue

            formatted_history.append(
                types.Content(
                    role=role,
                    parts=[
                        types.Part.from_text(
                            text=text
                        )
                    ]
                )
            )


        chat_session = client.chats.create(

            model="gemini-3.6-flash",

            history=formatted_history

        )


      

        response = chat_session.send_message(
            user_message
        )


        return jsonify({

            "response": response.text

        })


    except Exception as e:

        print("Gemini Error:", e)

        return jsonify({

            "error": "Dino AI could not generate a response."

        }), 500


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
