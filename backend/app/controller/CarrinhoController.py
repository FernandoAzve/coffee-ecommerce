from flask import request, jsonify
from flask_restful import Resource
from app import db
from app.model.CarrinhoModel import Carrinho
from app.model.ProdutoModel import Produto
import jwt
import os

JWT_SECRET = os.getenv('JWT_SECRET')

def decode_token(token):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

class CarrinhoController(Resource):
    def get(self):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        itens = Carrinho.query.filter_by(id_cliente=user_id).all()
        itens_dict = []
        for item in itens:
            produto = Produto.query.filter_by(id_produto=item.id_produto).first()
            item_dict = item.to_dict()
            item_dict['produto_nome'] = produto.nome_produto if produto else 'Produto não encontrado'
            itens_dict.append(item_dict)

        return {'itens': itens_dict}, 200

    def post(self):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        data = request.get_json()
        id_produto = data.get('id_produto')
        valor_unitario = data.get('valor_unitario')
        quantidade = data.get('quantidade')

        if not all([id_produto, valor_unitario, quantidade]):
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        # Verifica se o item já existe no carrinho do usuário
        item_existente = Carrinho.query.filter_by(id_cliente=user_id, id_produto=id_produto).first()
        if item_existente:
            # Atualiza a quantidade do item existente
            item_existente.quantidade += quantidade
            db.session.commit()
            return {
                'message': 'Quantidade do item atualizada com sucesso!',
                'item': {
                    'id_carrinho': item_existente.id_carrinho,
                    'id_cliente': item_existente.id_cliente,
                    'id_produto': item_existente.id_produto,
                    'valor_unitario': float(item_existente.valor_unitario),  # Converte para float
                    'quantidade': item_existente.quantidade
                }
            }, 200
        else:
            # Adiciona um novo item ao carrinho
            novo_item = Carrinho(
                id_cliente=user_id,
                id_produto=id_produto,
                valor_unitario=valor_unitario,
                quantidade=quantidade
            )

            db.session.add(novo_item)
            db.session.commit()
            db.session.refresh(novo_item)  # Atualiza o objeto para obter o ID gerado

            return {
                'message': 'Item adicionado ao carrinho com sucesso!',
                'item': {
                    'id_carrinho': novo_item.id_carrinho,
                    'id_cliente': novo_item.id_cliente,
                    'id_produto': novo_item.id_produto,
                    'valor_unitario': float(novo_item.valor_unitario),  # Converte para float
                    'quantidade': novo_item.quantidade
                }
            }, 201

class DeduzirItemCarrinho(Resource):
    def put(self, item_id):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        item = Carrinho.query.filter_by(id_carrinho=item_id, id_cliente=user_id).first()
        if not item:
            return {'error': 'Item não encontrado no carrinho.'}, 404

        if item.quantidade > 1:
            item.quantidade -= 1
            db.session.commit()
        else:
            db.session.delete(item)
            db.session.commit()

        itens = Carrinho.query.filter_by(id_cliente=user_id).all()
        itens_dict = []
        for item in itens:
            produto = Produto.query.filter_by(id_produto=item.id_produto).first()
            item_dict = item.to_dict()
            item_dict['produto_nome'] = produto.nome_produto if produto else 'Produto não encontrado'
            itens_dict.append(item_dict)

        return {'itens': itens_dict}, 200

class AdicionarItemCarrinho(Resource):
    def put(self, item_id):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        item = Carrinho.query.filter_by(id_carrinho=item_id, id_cliente=user_id).first()
        if not item:
            return {'error': 'Item não encontrado no carrinho.'}, 404

        item.quantidade += 1
        db.session.commit()

        itens = Carrinho.query.filter_by(id_cliente=user_id).all()
        itens_dict = []
        for item in itens:
            produto = Produto.query.filter_by(id_produto=item.id_produto).first()
            item_dict = item.to_dict()
            item_dict['produto_nome'] = produto.nome_produto if produto else 'Produto não encontrado'
            itens_dict.append(item_dict)

        return {'itens': itens_dict}, 200

class ExcluirItemCarrinho(Resource):
    def delete(self, item_id):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        item = Carrinho.query.filter_by(id_carrinho=item_id, id_cliente=user_id).first()
        if not item:
            return {'error': 'Item não encontrado no carrinho.'}, 404

        db.session.delete(item)
        db.session.commit()

        itens = Carrinho.query.filter_by(id_cliente=user_id).all()
        itens_dict = []
        for item in itens:
            produto = Produto.query.filter_by(id_produto=item.id_produto).first()
            item_dict = item.to_dict()
            item_dict['produto_nome'] = produto.nome_produto if produto else 'Produto não encontrado'
            itens_dict.append(item_dict)

        return {'itens': itens_dict}, 200

class LimparCarrinho(Resource):
    def delete(self):
        token = request.headers.get('Authorization').split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        items = Carrinho.query.filter_by(id_cliente=user_id).all()
        if not items:
            return {'error': 'Nenhum item encontrado para este usuário.'}, 404

        for item in items:
            db.session.delete(item)
        db.session.commit()

        return {'message': f'Carrinho limpo para o usuário {user_id}.'}, 200