from flask import Flask, jsonify, render_template_string 
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/products")
def get_products_api():
    with open("products.json", "r", encoding="utf-8") as f:
        return jsonify(json.load(f))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
