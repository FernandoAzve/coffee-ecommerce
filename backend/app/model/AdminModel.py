from app import db

class Admin(db.Model):
    __tablename__ = 'cadastro_adm'

    id_adm = db.Column(db.Integer, primary_key=True)
    nome_adm = db.Column(db.String(100), nullable=False)
    email_adm = db.Column(db.String(256), unique=True, nullable=False)
    senha_hash_adm = db.Column(db.String(60), nullable=False)

    def to_dict(self):
        return {
            'id': self.id_adm,
            'nome': self.nome_adm,
            'email': self.email_adm
        }