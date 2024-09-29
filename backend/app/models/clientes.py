from app import db

class Cliente(db.Model):
    __tablename__ = 'clientes'

    id_cliente = db.Column(db.Integer, primary_key=True)
    nome_cliente = db.Column(db.String(100), nullable=False)
    cpf_cliente = db.Column(db.String(11), nullable=False)
    email_cliente = db.Column(db.String(256), nullable=False)
    senha_hash_cliente = db.Column(db.String(60), nullable=False)
    endereco_logradouro_cliente = db.Column(db.String(256), nullable=False)
    endereco_bairro_cliente = db.Column(db.String(256), nullable=False)
    endereco_cidade_cliente = db.Column(db.String(256), nullable=False)
    endereco_estado_cliente = db.Column(db.String(256), nullable=False)
    endereco_numero_cliente = db.Column(db.String(10), nullable=False)
    endereco_complemento_cliente = db.Column(db.String(256), nullable=False)
    endereco_cep_cliente = db.Column(db.String(8), nullable=False)
    telefone_cliente = db.Column(db.String(11), nullable=False)

    def to_dict(self):
        return {
            'id': self.id_cliente,
            'nome': self.nome_cliente,
            'cpf': self.cpf_cliente,
            'email': self.email_cliente,
            'senha': self.senha_hash_cliente,
            'endereco': {
                'logradouro': self.endereco_logradouro_cliente,
                'bairro': self.endereco_bairro_cliente,
                'cidade': self.endereco_cidade_cliente,
                'estado': self.endereco_estado_cliente,
                'numero': self.endereco_numero_cliente,
                'complemento': self.endereco_complemento_cliente,
                'cep': self.endereco_cep_cliente
            },
            'telefone': self.telefone_cliente
        }