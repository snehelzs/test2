from flask import Flask, request, jsonify
import pyjwt  
from datetime import datetime
from flask_cors import CORS



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})




def validate_jwt_token(token):
    try:
        # Azure AD se di gayi secret key
        secret_key = "your_secret_key_here"
        
        # Token ko decode karna
        payload = pyjwt.decode(token, secret_key, algorithms=["RS256"])
        
        # Token ki expiration check karna
        if payload["exp"] < int(datetime.now().timestamp()):
            return False
        
        return True
    
    except pyjwt.ExpiredSignatureError:
        return False
    
    except pyjwt.InvalidTokenError:
        return False
    




@app.route('/api', methods=['GET'])
def secure_endpoint():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return jsonify({"message": "Authorization header missing"}), 401

    token = auth_header.replace("Bearer ", "")
    
    if validate_jwt_token(token):
        return jsonify({"message": "Token is valid", "data": "Your secured data here"})
    else:
        return jsonify({"message": "Invalid or expired token"}), 403




if __name__ == '__main__':
    app.run(debug=True)
