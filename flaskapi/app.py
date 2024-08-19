# app.py

from flask import Flask
from db import mongo
from routes.prospect import prospect_bp

app = Flask(__name__)
app.config.from_object('config.Config')
mongo.init_app(app)

app.register_blueprint(prospect_bp)

if __name__ == "__main__":
    app.run(debug=True)
