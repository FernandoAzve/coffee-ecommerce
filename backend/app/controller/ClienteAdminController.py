from flask import jsonify
from flask_restful import Resource
from app.model.ClienteModel import Cliente
from app.model.PedidoClienteModel import PedidoCliente
from app import db
from app.controller.PedidosAdminController import ExcluirPedido 
from app.controller.CarrinhoController import ExcluirItensCarrinho

class GetCliente(Resource):
    def get(self):
        clientes = Cliente.query.all()
        clientes_dict = [cliente.to_dict() for cliente in clientes]
        return jsonify(clientes_dict)

class DeleteCliente(Resource):
    def delete(self, cliente_id):
        cliente = Cliente.query.get(cliente_id)
        if not cliente:
            return {'error': 'Cliente não encontrado.'}, 404
        
        pedidos = PedidoCliente.query.filter_by(id_cliente=cliente_id).all()
        for pedido in pedidos:
            excluir_pedido = ExcluirPedido()
            excluir_pedido.delete(pedido.id_pedido)
        
        excluir_itens_carrinho = ExcluirItensCarrinho()
        excluir_itens_carrinho.delete(cliente_id)
        
        db.session.delete(cliente)
        db.session.commit()
        
        return {'message': 'Cliente, seus pedidos e itens do carrinho deletados com sucesso.'}, 200