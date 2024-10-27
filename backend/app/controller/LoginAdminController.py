import bcrypt
import jwt
import datetime
import os
from flask import request
from flask_restful import Resource
from app.model.AdminModel import Admin

JWT_SECRET = os.getenv('JWT_SECRET', 'your_jwt_secret')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM', 'HS256')
JWT_EXP_DELTA_SECONDS = int(os.getenv('JWT_EXP_DELTA_SECONDS', 3600))

class AdminLoginController(Resource):
    def post(self):
        try:
            data = request.json
            email_adm = data.get('email_adm')
            senha_adm = data.get('senha_adm')

            if not email_adm or not senha_adm:
                return {'error': 'E-mail e senha são obrigatórios.'}, 400

            admin = Admin.query.filter_by(email_adm=email_adm).first()
            if not admin:
                return {'error': 'E-mail ou senha incorretos.'}, 400

            if not bcrypt.checkpw(senha_adm.encode('utf-8'), admin.senha_hash_adm.encode('utf-8')):
                return {'error': 'E-mail ou senha incorretos.'}, 400

            payload = {
                'user_id': admin.id_adm,
                'role': 'admin',
                'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
            }
            token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

            return {
                'message': 'Login bem-sucedido',
                'token': token,
                'admin': admin.to_dict()
            }, 200

        except Exception as e:
            return {'error': str(e)}, 500