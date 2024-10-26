from app import db

class PedidoCliente(db.Model):
    __tablename__ = 'pedidos_clientes'

    id_pedido = db.Column(db.Integer, primary_key=True)
    id_status = db.Column(db.Integer, nullable=False)
    id_cliente = db.Column(db.Integer, nullable=False)
    valor_compra = db.Column(db.Numeric(14, 2), nullable=False)
    data_pedido = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id_pedido': self.id_pedido,
            'id_status': self.id_status,
            'id_cliente': self.id_cliente,
            'valor_compra': float(self.valor_compra),
            'data_pedido': self.data_pedido.isoformat()
        }