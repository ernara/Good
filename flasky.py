from flask import Flask
from routers.note_router import note_router
from routers.auth_router import auth_router

app = Flask(__name__)
app.register_blueprint(note_router)
app.register_blueprint(auth_router)