from flask import Blueprint, jsonify, request
from db import db

user_router = Blueprint('user_router', __name__)
