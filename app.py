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


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
