from app import db

class Produto(db.Model):
    __tablename__ = 'produtos_estoque'

    id_produto = db.Column(db.Integer, primary_key=True)
    nome_produto = db.Column(db.String(100), nullable=False)
    preco_produto = db.Column(db.Numeric(14, 2), nullable=False)
    quantidade_produto = db.Column(db.Integer, nullable=False)
    categoria_produto = db.Column(db.String(255), nullable=False)
    imagem_produto = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id_produto,
            'nome': self.nome_produto,
            'preco': str(self.preco_produto),
            'quantidade': self.quantidade_produto,
            'categoria': self.categoria_produto,
            'imagem': self.imagem_produto
        }