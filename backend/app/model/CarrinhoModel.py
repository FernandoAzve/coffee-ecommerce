from app import db

class Carrinho(db.Model):
    __tablename__ = 'carrinho'

    id_carrinho = db.Column(db.Integer, primary_key=True)
    id_cliente = db.Column(db.Integer, nullable=False)
    id_produto = db.Column(db.Integer, nullable=False)
    valor_unitario = db.Column(db.Numeric(14, 2), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id_carrinho': self.id_carrinho,
            'id_cliente': self.id_cliente,
            'id_produto': self.id_produto,
            'valor_unitario': float(self.valor_unitario),
            'quantidade': self.quantidade
        }