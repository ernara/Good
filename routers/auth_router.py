from flask import redirect, session, Blueprint, jsonify, request, url_for
import requests
import google.oauth2.credentials
import google_auth_oauthlib.flow
import googleapiclient.discovery

CLIENT_SECRETS_FILE = "client_secret.json"

auth_router = Blueprint('auth_router', __name__)

SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
API_SERVICE_NAME = 'drive'
API_VERSION = 'v2'


@auth_router.route('/auth/login')
def test_api_request():
    if 'credentials' not in session:
        return redirect('authorize')

    credentials = google.oauth2.credentials.Credentials(
        **session['credentials'])

    drive = googleapiclient.discovery.build(
        API_SERVICE_NAME, API_VERSION, credentials=credentials)

    user_info = drive.about().get(fields="user(emailAddress,displayName)").execute()

    print("User Info:", user_info)

    email = user_info['user']['emailAddress']
    name = user_info['user']['displayName']
    
    token = credentials.token

    session['credentials'] = credentials_to_dict(credentials)

    return redirect('/?email={}&name={}&token={}'.format(email, name, token))

@auth_router.route('/api/userinfo')
def get_user_info():
    user_info = {
        'name': 'John',
        'surname': 'Doe'
    }
    return jsonify(user_info)


@auth_router.route('/auth/authorize')
def authorize():

  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES)

 
  flow.redirect_uri = url_for('auth_router.oauth2callback', _external=True)

  authorization_url, state = flow.authorization_url(
      
      access_type='offline',
      include_granted_scopes='true')

  session['state'] = state

  return redirect(authorization_url)


@auth_router.route('/oauth2callback')
def oauth2callback():
  print("hi")
  state = session['state']

  flow = google_auth_oauthlib.flow.Flow.from_client_secrets_file(
      CLIENT_SECRETS_FILE, scopes=SCOPES, state=state)
  flow.redirect_uri = url_for('auth_router.oauth2callback', _external=True)

  authorization_response = request.url
  flow.fetch_token(authorization_response=authorization_response)

  
  credentials = flow.credentials
  session['credentials'] = credentials_to_dict(credentials)

  return redirect(url_for('auth_router.test_api_request'))


@auth_router.route('/revoke')
def revoke():
  if 'credentials' not in session:
    return ('You need to <a href="/auth/authorize">authorize</a> before ' +
            'testing the code to revoke credentials.')

  credentials = google.oauth2.credentials.Credentials(
    **session['credentials'])

  revoke = requests.post('https://oauth2.googleapis.com/revoke',
      params={'token': credentials.token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})

  status_code = getattr(revoke, 'status_code')
  if status_code == 200:
    return('Credentials successfully revoked.')
  else:
    return('An error occurred.')


@auth_router.route('/clear')
def clear_credentials():
  print ("1")
  if 'credentials' in session:
    print ("2")
    del session['credentials']
  print ("3")
  return (redirect(url_for('register')))


def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}

