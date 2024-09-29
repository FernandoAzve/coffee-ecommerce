from flask import request, jsonify
from flask_restful import Resource
from app.model.ClienteModel import Cliente
from app import db

class ClienteResource(Resource):
    def post(self):
        data = request.json
        nome_cliente = data.get('nome_cliente')
        cpf_cliente = data.get('cpf_cliente')
        email_cliente = data.get('email_cliente')
        senha_cliente = data.get('senha_cliente')
        endereco_logradouro_cliente = data.get('endereco_logradouro_cliente')
        endereco_bairro_cliente = data.get('endereco_bairro_cliente')
        endereco_cidade_cliente = data.get('endereco_cidade_cliente')
        endereco_estado_cliente = data.get('endereco_estado_cliente')
        endereco_numero_cliente = data.get('endereco_numero_cliente')
        endereco_complemento_cliente = data.get('endereco_complemento_cliente')
        endereco_cep_cliente = data.get('endereco_cep_cliente')
        telefone_cliente = data.get('telefone_cliente')

        if not all([nome_cliente, cpf_cliente, email_cliente, senha_cliente, endereco_logradouro_cliente, endereco_bairro_cliente, endereco_cidade_cliente, endereco_estado_cliente, endereco_numero_cliente, endereco_cep_cliente, telefone_cliente]):
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        senha_hash_cliente = Cliente.hash_senha(senha_cliente)

        novo_cliente = Cliente(
            nome_cliente = nome_cliente,
            cpf_cliente = cpf_cliente,
            email_cliente = email_cliente,
            senha_hash_cliente = senha_hash_cliente,
            endereco_logradouro_cliente = endereco_logradouro_cliente,
            endereco_bairro_cliente = endereco_bairro_cliente,
            endereco_cidade_cliente = endereco_cidade_cliente,
            endereco_estado_cliente = endereco_estado_cliente,
            endereco_numero_cliente = endereco_numero_cliente,
            endereco_complemento_cliente = endereco_complemento_cliente,
            endereco_cep_cliente = endereco_cep_cliente,
            telefone_cliente = telefone_cliente
        )

        db.session.add(novo_cliente)
        db.session.commit()

        return novo_cliente.to_dict(), 201