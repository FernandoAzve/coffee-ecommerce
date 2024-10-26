from flask import request, jsonify
from flask_restful import Resource
from app import db
from app.model.PedidoClienteModel import PedidoCliente
from app.model.StatusPedidoModel import StatusPedido
from app.model.ItemPedidoModel import ItemPedido
from app.model.ProdutoModel import Produto
from app.model.ClienteModel import Cliente
import jwt
import os
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

class TodosPedidos(Resource):
    def get(self):
        pedidos = PedidoCliente.query.all()
        pedidos_info = []

        for pedido in pedidos:
            status = StatusPedido.query.filter_by(id_status=pedido.id_status).first()
            cliente = Cliente.query.filter_by(id_cliente=pedido.id_cliente).first()  # Buscar informações do cliente
            endereco = f"{cliente.endereco_logradouro_cliente}, {cliente.endereco_numero_cliente}, {cliente.endereco_cep_cliente}, {cliente.endereco_complemento_cliente}, {cliente.endereco_bairro_cliente}, {cliente.endereco_cidade_cliente}, {cliente.endereco_estado_cliente}"
            itens_pedido = ItemPedido.query.filter_by(id_pedido=pedido.id_pedido).all()
            produtos = ', '.join([f"{item.quantidade}x {Produto.query.filter_by(id_produto=item.id_produto).first().nome_produto}" for item in itens_pedido])
            pedidos_info.append({
                'id_pedido': pedido.id_pedido,
                'id_cliente': pedido.id_cliente,
                'produtos': produtos,
                'valor': float(pedido.valor_compra),
                'id_status': pedido.id_status,
                'status': status.nome_status if status else 'Desconhecido',
                'endereco': endereco
            })

        status_pedidos = StatusPedido.query.all()
        status_info = [{'id_status': status.id_status, 'nome_status': status.nome_status} for status in status_pedidos]

        return {'pedidos': pedidos_info, 'status': status_info}, 200

class AtualizarStatusPedido(Resource):
    def put(self, pedido_id):
        data = request.get_json()
        novo_status = data.get('id_status')

        pedido = PedidoCliente.query.filter_by(id_pedido=pedido_id).first()
        if not pedido:
            return {'error': 'Pedido não encontrado.'}, 404

        pedido.id_status = novo_status
        db.session.commit()

        return {'message': 'Status do pedido atualizado com sucesso.'}, 200