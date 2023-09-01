from flask import Flask, render_template
from routers.note_router import note_router
from db import db

app = Flask(__name__)
app.register_blueprint(note_router)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
        app.run(debug=True, port=7777)
