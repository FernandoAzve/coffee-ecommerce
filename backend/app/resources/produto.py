from flask import request, jsonify
from flask_restful import Resource
from app.models.estoque_produtos import Produto
from app import db

class ProdutoResource(Resource):
    def get(self):
        produtos = Produto.query.all()
        return jsonify([produto.to_dict() for produto in produtos])

    def post(self):
        data = request.json
        nome_produto = data.get('nome_produto')
        preco_produto = data.get('preco_produto')
        quantidade_produto = data.get('quantidade_produto')

        # Verificar se todos os campos obrigatórios estão presentes
        if not nome_produto or not preco_produto or not quantidade_produto:
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        # Validar se o preço é numérico
        try:
            preco_produto = float(preco_produto)
        except ValueError:
            return {'error': 'Preço inválido. Certifique-se de que o valor é numérico.'}, 400

        # Criar um novo produto
        novo_produto = Produto(
            nome_produto=nome_produto, 
            preco_produto=preco_produto, 
            quantidade_produto=quantidade_produto
        )
        db.session.add(novo_produto)
        db.session.commit()

        return novo_produto.to_dict(), 201

class ProdutoByIdResource(Resource):
    def delete(self, id):
        produto = Produto.query.get(id)
        if not produto:
            return {'error': 'Produto não encontrado.'}, 404

        db.session.delete(produto)
        db.session.commit()
        return '', 204