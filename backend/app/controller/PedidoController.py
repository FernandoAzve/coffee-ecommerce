from flask import request, jsonify
from flask_restful import Resource
from app import db
from app.model.PedidoClienteModel import PedidoCliente
from app.model.ItemPedidoModel import ItemPedido
from app.model.CarrinhoModel import Carrinho
from app.model.StatusPedidoModel import StatusPedido
import jwt
import os
from sqlalchemy.sql import func
from datetime import timedelta

JWT_SECRET = os.getenv('JWT_SECRET')

def decode_token(token):
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return decoded
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

class FinalizarPedido(Resource):
    def post(self):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return {'error': 'Token não fornecido.'}, 401

        token = auth_header.split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']
        data = request.get_json()
        endereco = data.get('endereco')
        numero = data.get('numero')
        complemento = data.get('complemento')
        cep = data.get('cep')

        if not all([endereco, numero, cep]):
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        itens_carrinho = Carrinho.query.filter_by(id_cliente=user_id).all()
        if not itens_carrinho:
            return {'error': 'Carrinho vazio.'}, 400

        valor_total = sum(item.valor_unitario * item.quantidade for item in itens_carrinho)

        novo_pedido = PedidoCliente(
            id_status=1,
            id_cliente=user_id,
            valor_compra=valor_total,
            data_pedido=func.now()
        )
        db.session.add(novo_pedido)
        db.session.commit()
        db.session.refresh(novo_pedido)

        for item in itens_carrinho:
            novo_item_pedido = ItemPedido(
                id_pedido=novo_pedido.id_pedido,
                id_produto=item.id_produto,
                quantidade=item.quantidade
            )
            db.session.add(novo_item_pedido)
            db.session.delete(item)

        db.session.commit()

        return {'message': 'Pedido realizado com sucesso!', 'pedido': novo_pedido.to_dict()}, 201
    
class MeusPedidos(Resource):
    def get(self):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return {'error': 'Token não fornecido.'}, 401

        token = auth_header.split()[1]
        decoded_token = decode_token(token)
        if not decoded_token:
            return {'error': 'Token inválido ou expirado.'}, 401

        user_id = decoded_token['user_id']

        pedidos = PedidoCliente.query.filter_by(id_cliente=user_id).all()
        pedidos_info = []

        for pedido in pedidos:
            status = StatusPedido.query.filter_by(id_status=pedido.id_status).first()
            data_entrega = pedido.data_pedido + timedelta(days=7)
            pedidos_info.append({
                'id_pedido': pedido.id_pedido,
                'valor': float(pedido.valor_compra),
                'status': status.nome_status if status else 'Desconhecido',
                'data_entrega': data_entrega.strftime('%d/%m/%Y')
            })

        return {'pedidos': pedidos_info}, 200