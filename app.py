import os
import json
from flask import render_template
from db import db
from flask import Flask, request
from routers.note_router import note_router
from config import Config

from routers.auth_router import auth_router
from auth import oauth


app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
oauth.init_app(app)


app.register_blueprint(note_router)
app.register_blueprint(auth_router)



@app.route('/')
def index():
    return render_template('index.html')



@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')


if __name__ == '__main__':
    with app.app_context():
        os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'
        db.create_all()  
        app.run(debug=True, port=5000)


