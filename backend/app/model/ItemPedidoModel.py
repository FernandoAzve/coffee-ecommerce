from app import db

class ItemPedido(db.Model):
    __tablename__ = 'item_pedido'

    id_pedido = db.Column(db.Integer, primary_key=True)
    id_produto = db.Column(db.Integer, primary_key=True)
    quantidade = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id_pedido': self.id_pedido,
            'id_produto': self.id_produto,
            'quantidade': self.quantidade,
        }