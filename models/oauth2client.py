from flask_sqlalchemy import SQLAlchemy
from authlib.oauth2.rfc6749 import ClientMixin
from db import db

class OAuth2Client(db.Model, ClientMixin):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))
    user = db.relationship('User')
    client_id = db.Column(db.String(48), unique=True, nullable=False)
    client_secret = db.Column(db.String(120), nullable=False, index=True)
    redirect_uris = db.Column(db.String(2000), nullable=False)
    grant_type = db.Column(db.String(48), default='authorization_code')
    response_type = db.Column(db.String(48), default='code')
    scope = db.Column(db.String(200), default='')
    client_name = db.Column(db.String(120))
    client_uri = db.Column(db.String(200))
    logo_uri = db.Column(db.String(200))
    tos_uri = db.Column(db.String(200))
    policy_uri = db.Column(db.String(200))
    allowed_grant_types = db.relationship('OAuth2ClientGrantType', back_populates='client')

class OAuth2ClientGrantType(db.Model):
   
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('oauth2_clients.id', ondelete='CASCADE'))
    grant_type = db.Column(db.String(48))
    client = db.relationship('OAuth2Client', back_populates='allowed_grant_types')

