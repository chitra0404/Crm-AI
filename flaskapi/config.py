import os

class Config:
    MONGO_URI = "mongodb+srv://chitrasuresh0404:Chitra0415@cluster0.thyteob.mongodb.net/aicrm"
    SECRET_KEY = os.urandom(24)
    DEBUG = True

# To load the config in app.py
# app.config.from_object('config.Config')
