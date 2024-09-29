from flask import jsonify
from flask_restful import Resource
from app.model.ClienteModel import Cliente
from app import db

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
        
        db.session.delete(cliente)
        db.session.commit()
        
        return {'message': 'Cliente deletado com sucesso.'}, 200