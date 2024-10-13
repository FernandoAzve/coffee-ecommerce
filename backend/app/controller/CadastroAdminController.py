from flask import request, jsonify
from flask_restful import Resource
from app import db
from app.model.AdminModel import Admin
import bcrypt

class CadastroAdmin(Resource):
    def post(self):
        data = request.json
        nome_adm = data.get('nome_adm')
        email_adm = data.get('email_adm')
        senha_adm = data.get('senha_adm')

        if not nome_adm or not email_adm or not senha_adm:
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        if Admin.query.filter_by(email_adm=email_adm).first():
            return {'error': 'E-mail já cadastrado.'}, 400
        
        senha_hash_adm = bcrypt.hashpw(senha_adm.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        novo_admin = Admin(
            nome_adm=nome_adm,
            email_adm=email_adm,
            senha_hash_adm=senha_hash_adm
            )
        db.session.add(novo_admin)
        db.session.commit()

        return {'message': 'Administrador cadastrado com sucesso!', 'admin': novo_admin.to_dict()}, 201