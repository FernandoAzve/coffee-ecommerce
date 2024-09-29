import jwt
import os
from functools import wraps
from flask import request, jsonify

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')

os.getenv('SQLALCHEMY_DATABASE_URI')

def authenticate_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'error': 'Token ausente'}), 401
        
        try:
            payload = jwt.decode(token.split(" ")[1], JWT_SECRET, algorithms=[JWT_ALGORITHM])
            request.user_id = payload['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Token inválido'}), 401
        
        return f(*args, **kwargs)
    
    return decorated_function