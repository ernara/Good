from flask_oauthlib.client import OAuth
import json

oauth = OAuth()
google = None 

def configure_google_oauth():
    global google 
    with open('client_secret.json', 'r') as credentials_file:
        credentials = json.load(credentials_file)
        client_id = credentials['web']['client_id']
        client_secret = credentials['web']['client_secret']
        redirect_uri = credentials['web']['redirect_uris'][0]

    google = oauth.remote_app(
        'google',
        consumer_key=client_id,
        consumer_secret=client_secret,
        request_token_params={
            'scope': 'email profile',
        },
        base_url='https://www.googleapis.com/oauth2/v1/',
        request_token_url=None,
        access_token_method='POST',
        access_token_url=credentials['web']['token_uri'],
        authorize_url=credentials['web']['auth_uri'],
        redirect_uri=redirect_uri 
    )


