from flask import Blueprint, session,flash, render_template, redirect, url_for, session
from models.note_model import Note
from db import db
from models.user_model import User
from  classes.loginForm_class import LoginForm
from werkzeug.security import generate_password_hash, check_password_hash

auth_router = Blueprint('auth_router', __name__)

@auth_router.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password', 'error')

    return render_template('login.html', form=form)

@auth_router.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        return 'Welcome to the dashboard!'
    else:
        return redirect(url_for('login'))

@auth_router.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('login'))