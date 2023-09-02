from flask import render_template
from db import db
from flask import Flask
from routers.note_router import note_router
from routers.auth_router import auth_router
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

app.register_blueprint(note_router)
app.register_blueprint(auth_router)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
        app.run(debug=True, port=7777)
