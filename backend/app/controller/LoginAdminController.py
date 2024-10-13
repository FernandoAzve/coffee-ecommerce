import bcrypt
import jwt
import datetime
import os
from flask import request
from flask_restful import Resource
from app.model.AdminModel import Admin

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
JWT_EXP_DELTA_SECONDS = int(os.getenv('JWT_EXP_DELTA_SECONDS'))

class AdminLoginController(Resource):
    def post(self):
        data = request.json
        email_admin = data.get('email_admin')
        senha_admin = data.get('senha_admin')

        if not email_admin or not senha_admin:
            return {'error': 'E-mail e senha são obrigatórios.'}, 400

        # Busca o administrador no banco de dados
        admin = Admin.query.filter_by(email_admin=email_admin).first()
        if not admin:
            return {'error': 'E-mail ou senha incorretos.'}, 400

        # Verifica a senha
        if not bcrypt.checkpw(senha_admin.encode('utf-8'), admin.senha_hash_admin.encode('utf-8')):
            return {'error': 'E-mail ou senha incorretos.'}, 400

        # Gera o token JWT
        payload = {
            'user_id': admin.id_admin,
            'role': 'admin',
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

        return {
            'message': 'Login bem-sucedido',
            'token': token,
            'admin': admin.to_dict()
        }, 200