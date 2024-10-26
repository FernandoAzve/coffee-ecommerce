from app import db

class StatusPedido(db.Model):
    __tablename__ = 'status_pedido'

    id_status = db.Column(db.Integer, primary_key=True)
    nome_status = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id_status': self.id_status,
            'nome_status': self.nome_status
        }