from flask import Flask, render_template
from routers.note_router import note_router

app = Flask(__name__)
app.register_blueprint(note_router)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=7777)