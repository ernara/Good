from flask import Blueprint, jsonify, request, redirect, session, url_for
from db import db
from auth import google

auth_router = Blueprint('auth_router', __name__)

@auth_router.route('/auth/login')
def login():
    return google.authorize(callback=url_for('auth_router.authorized', _external=True))


@auth_router.route('/auth/logout')
def logout():
    session.pop('google_token', None)
    return redirect(url_for('index'))

@auth_router.route('/auth/login/authorized')
@google.authorized_handler
def authorized(resp):
    if resp is None or resp.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (resp['access_token'], '')
    user_info = google.get('userinfo')

    email = user_info.data['email']
    given_name = user_info.data['given_name']
    family_name = user_info.data['family_name']
    token = resp['access_token']


    return jsonify(email=email, given_name=given_name, family_name=family_name, token=token)

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')
