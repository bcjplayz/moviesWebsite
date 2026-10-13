import os
from flask import Flask, render_template
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__, template_folder="template")
app.secret_key = os.getenv("SECRET-KEY")


@app.route("/")
def Home():
    return render_template("index.html", FA_LINK = os.getenv("FA-Link"))