import bcrypt
import jwt
import datetime
import os
from flask import request
from flask_restful import Resource
from app.model.ClienteModel import Cliente

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')
JWT_EXP_DELTA_SECONDS = int(os.getenv('JWT_EXP_DELTA_SECONDS'))

class LoginController(Resource):
    def post(self):
        data = request.json
        email_cliente = data.get('email_cliente')
        senha_cliente = data.get('senha_cliente')

        if not email_cliente or not senha_cliente:
            return {'error': 'E-mail e senha são obrigatórios.'}, 400

        cliente = Cliente.query.filter_by(email_cliente=email_cliente).first()
        if not cliente:
            return {'error': 'E-mail ou senha incorretos.'}, 400

        if not bcrypt.checkpw(senha_cliente.encode('utf-8'), cliente.senha_hash_cliente.encode('utf-8')):
            return {'error': 'E-mail ou senha incorretos.'}, 400

        payload = {
            'user_id': cliente.id_cliente,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=JWT_EXP_DELTA_SECONDS)
        }
        token = jwt.encode(payload, JWT_SECRET, JWT_ALGORITHM)

        return {
            'message': 'Login bem-sucedido',
            'token': token,
            'cliente': cliente.to_dict()
        }, 200