import requests
import jwt
from flask_cors import CORS
from flask import Flask, request, jsonify
from azure_ad_verify_token import verify_jwt

# Define constants
JWKS_URI = 'https://login.microsoftonline.com/16ef7375-c866-409c-8b53-0bdf4196643f/discovery/v2.0/keys'
EXPECTED_ISSUER = 'https://sts.windows.net/16ef7375-c866-409c-8b53-0bdf4196643f/'
APP_ID = '9f385813-9b34-4ab7-8569-ace008e18ddc'
PUBLIC_KEY = """
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiheTlbqieo0KzaFBTz6dxt9LAENfe2d0ywnpvZx9khzurtApc4ThWBpeoTBI6UpReeCwyW6DQjJSGCqHwe+wqRdgoiMc0PV+danrh0px38x2KL/j7VoHR0hlQBYOpp5GBMdz+Nsc80wBtHAqxz7Nno3qYNTXUvwZ2LSbbvgoPXrh0zhLlSrn2gAroRv6Z8xSOVg3CSmZeVgZHJv4aMYQiBiIIZW68YN5ywHxOf6+LdrhqN24NPSLYUNPKGxCkUkWg+VV+iulUqIkDxn3SKiX4zVA+jevbuUrsK3MeRHoJLqXMf8KnpPkf4ZLCTLdUNFyLyxFvqnm6QUAgpDrQ/rxhwIDAQAB
-----END PUBLIC KEY-----
"""

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


def validate_jwt(jwt_token):
    try:
        # Decode the token
        decoded_token = jwt.decode(
            jwt_token,
            PUBLIC_KEY,
            algorithms=["RS256"],  # Specify the algorithm you used for signing
            issuer=EXPECTED_ISSUER,
            audience="api://9f385813-9b34-4ab7-8569-ace008e18ddc"
        )
        print("JWT is valid. Payload:", decoded_token)
        return decoded_token

       

    except jwt.ExpiredSignatureError:
        print("Token has expired.")
        return "Token has expired."
    except jwt.InvalidTokenError as e:
        print("Invalid token:", e)
        return str(e)
    except PyJWTError as e:
        print("JWT verification error:", e)
        return str(e)
    except Exception as e:
        print("Error during JWT validation:", e)
        return str(e)


@app.route('/health-checker', methods=['POST'])
def secure_endpoint():
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return jsonify({"message": "Authorization header missing"}), 401

    token = auth_header.replace("Bearer ", "")
    print("Token received:", token)

    result = validate_jwt(token)
    user_name = result.get('name', 'Unknown User')
    print("UserName" , user_name)
    
    if isinstance(result, str):
        print("Validation error:", result)
        return jsonify({"message": result}), 403

    data = request.json
    source_list = data.get('sources', [])
    function_list = data.get('functions', [])

    return jsonify({
        "message": "Token is valid",
        "sources": source_list,
        "functions": function_list
    })

if __name__ == '__main__':
    app.run(debug=True)
