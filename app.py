from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)


# ==========================================
# GEMINI CLIENT
# ==========================================

def get_gemini_client():
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise RuntimeError(
            "GEMINI_API_KEY environment variable is missing."
        )

    return genai.Client(api_key=api_key)


# ==========================================
# WEBSITE ROUTES
# ==========================================

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


# ==========================================
# AI CHAT API
# ==========================================

@app.route("/api/chat", methods=["POST"])
def chat():

    try:

        # Get Gemini client only when chat is requested
        client = get_gemini_client()

        # Get JSON data
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "error": "Invalid request."
            }), 400

        # Get message
        user_message = data.get("message", "")

        if not isinstance(user_message, str):
            return jsonify({
                "error": "Message must be text."
            }), 400

        user_message = user_message.strip()

        if not user_message:
            return jsonify({
                "error": "Message is required."
            }), 400

        # Get history
        history = data.get("history", [])

        if not isinstance(history, list):
            history = []

        # Convert history to Gemini format
        formatted_history = []

        for msg in history:

            if not isinstance(msg, dict):
                continue

            role = msg.get("role")
            text = msg.get("text", "")

            if role not in ["user", "model"]:
                continue

            if not isinstance(text, str):
                continue

            text = text.strip()

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

        # Create chat session
        chat_session = client.chats.create(
            model="gemini-2.5-flash",
            history=formatted_history
        )

        # Send message
        response = chat_session.send_message(
            user_message
        )

        # Get response
        response_text = getattr(response, "text", None)

        if not response_text:
            return jsonify({
                "error": "Gemini returned an empty response."
            }), 500

        return jsonify({
            "response": response_text
        })

    except Exception as e:

        # Print actual error to Vercel logs
        print("====================================")
        print("GEMINI ERROR:")
        print(repr(e))
        print("====================================")

        return jsonify({
            "error": str(e)
        }), 500


# ==========================================
# LOCAL DEVELOPMENT
# ==========================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )
