import jwt
from jwt import PyJWKClient
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import cryptography

import numpy as np
from healthCheckerTest import health_checker
from valueChecker import value_checker

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

from dotenv import load_dotenv
load_dotenv()


CLIENT_ID = os.getenv('CLIENT_ID')
AUTHORITY = os.getenv('AUTHORITY')


# Your Azure AD tenant ID and API App ID
AUDIENCE = f'api://{CLIENT_ID}'
JWKS_URL = f'{AUTHORITY}/discovery/v2.0/keys'


# Fetch the JWKS (JSON Web Key Set) from Azure AD
def get_jwks():
    response = requests.get(JWKS_URL)
    response.raise_for_status()
    return response.json()


jwks = get_jwks()
print("jwks = ",jwks)


# def validate_token(token):
#     print("inside validate token")
#     print(token)
#     try:
#         payload = jwt.decode(
#             token,
#             jwks,
#             algorithms=['RS256'],
#             audience=AUDIENCE,
#             issuer=AUTHORITY
#         )
#         return payload
#     except jwt.ExpiredSignatureError:
#         return None
#     except jwt.InvalidTokenError:
#         return None






# Create a JWK client instance
jwk_client = PyJWKClient(JWKS_URL)

def validate_token(token):
    try:
        print("inside validate token")
        # Get the signing key from the JWKS
        signing_key = jwk_client.get_signing_key_from_jwt(token)
        print("signing key",signing_key)
        # Decode the token using the signing key
        payload = jwt.decode(
            token,
            signing_key.key,
            algorithms=['RS256'],
            audience=AUDIENCE,
            issuer=AUTHORITY
        )
        print("Token is valid!")
        return payload
    except jwt.InvalidTokenError as e:
        print(f"Invalid token: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error: {e}")
        return None



# def validate_token(token):
#     print("inside validate token")
#     try:
#         # Ensure jwks is a dictionary of key IDs to key objects
#         public_keys = {key['kid']: algorithms.RSAAlgorithm.from_jwk(json.dumps(key)) for key in jwks['keys']}
#         header = jwt.get_unverified_header(token)
#         rsa_key = public_keys.get(header['kid'])
#         if rsa_key:
#             payload = jwt.decode(
#                 token,
#                 rsa_key,
#                 algorithms=['RS256'],
#                 audience=AUDIENCE,
#                 issuer=AUTHORITY
#             )
#             return payload
#         else:
#             print("No RSA key found for kid:", header['kid'])
#             return None
#     except jwt.ExpiredSignatureError:
#         print("Token expired")
#         return None
#     except jwt.InvalidTokenError as e:
#         print(f'Token validation error: {e}')
#         return None







def check_authentication():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return jsonify({'error': 'Unauthorized'}), 401

    token = auth_header.split(' ')[1]
    decoded_token = jwt.decode(token, options={"verify_signature": False})
    print("decoded = ",decoded_token)
    # print('token in backend', token)
    payload = validate_token(token)
    if not payload:
        print("payload not found")
        return jsonify({'error': 'Invalid token'}), 401

    return None




def log_request(endpoint, params, error=None):
    if error:
        print(f"ERROR - Endpoint: {endpoint}, Parameters: {params}, Error: {error}")
    else:
        print(f"INFO - Endpoint: {endpoint}, Parameters: {params}")




@app.route('/')
def index():
    log_request('/', {})
    return "Hello LHP - Welcome to the DVE!"



HC_RESULT_FILE = './results/hc_result.json'
VC_RESULT_FILE = './results/vc_result.json'




@app.route('/health-checker', methods=['POST'])
def hc():
    # print('reached api endpoint')
    auth_error = check_authentication()
    print(auth_error)
    if auth_error:
        return auth_error

    try:
        data = request.json
        source_list = data.get('sources', [])
        function_list = data.get('functions', [])
        
        log_request('/health-checker', {'sources': source_list, 'functions': function_list})

        if not source_list or not function_list:
            error_message = "Parameters 'sources' and 'functions' are required"
            log_request('/health-checker', {'sources': source_list, 'functions': function_list}, error_message)
            return jsonify({"error": error_message}), 400
        
        summary = health_checker(source_list, function_list)
        with open(HC_RESULT_FILE, 'w') as f:
            json.dump(summary, f)
        return jsonify(summary)
    except Exception as e:
        log_request('/health-checker', request.json, str(e))
        return jsonify({"error": str(e)}), 500    




@app.route('/value-checker', methods=['POST'])
def vc():
    auth_error = check_authentication()
    if auth_error:
        return auth_error

    try:
        data = request.json
        measure_list = data.get('measures', [])
        function_list = data.get('functions', [])

        log_request('/value-checker', {'measures': measure_list, 'functions': function_list})

        if not measure_list or not function_list:
            error_message = "Parameters 'measures' and 'functions' are required"
            log_request('/value-checker', {'measures': measure_list, 'functions': function_list}, error_message)
            return jsonify({"error": error_message}), 400
        
        results = value_checker(measure_list, function_list)
        with open(VC_RESULT_FILE, 'w') as f:
            json.dump(results, f)

        return jsonify(results)
    except Exception as e:
        log_request('/value-checker', request.json, str(e))
        return jsonify({"error from api": str(e)}), 500

@app.route('/health-summary', methods=['GET'])
def get_hc():
    auth_error = check_authentication()
    if auth_error:
        return auth_error

    log_request('/health-summary', {})
    if os.path.exists(HC_RESULT_FILE):
        with open(HC_RESULT_FILE, 'r') as f:
            result = json.load(f)
        return jsonify(result)
    else:
        return jsonify({"error": "No result found"}), 404

@app.route('/value-summary', methods=['GET'])
def get_vc():
    auth_error = check_authentication()
    if auth_error:
        return auth_error

    log_request('/value-summary', {})
    if os.path.exists(VC_RESULT_FILE):
        with open(VC_RESULT_FILE, 'r') as f:
            result = json.load(f)
        return jsonify(result)
    else:
        return jsonify({"error": "No result found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
