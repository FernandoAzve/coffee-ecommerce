from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask import request, jsonify
from flask_restful import Resource
from dotenv import load_dotenv
import os

# Carregar as variáveis do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Permite que o frontend acesse o backend
api = Api(app)

# Configuração do banco de dados MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de Produto
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.String(20), nullable=False)
    quantidade = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'preco': self.preco,
            'quantidade': self.quantidade
        }

# Criação das tabelas no banco de dados
with app.app_context():
    db.create_all()

# Rotas da API
class ProdutoResource(Resource):
    def get(self):
        produtos = Produto.query.all()
        return jsonify([produto.to_dict() for produto in produtos])

    def post(self):
        data = request.json
        nome = data.get('nome')
        preco = data.get('preco')
        quantidade = data.get('quantidade')

        if not nome or not preco or not quantidade:
            return {'error': 'Todos os campos são obrigatórios.'}, 400

        novo_produto = Produto(nome=nome, preco=preco, quantidade=quantidade)
        db.session.add(novo_produto)
        db.session.commit()

        return novo_produto.to_dict(), 201

class ProdutoByIdResource(Resource):
    def delete(self, id):
        produto = Produto.query.get(id)
        if not produto:
            return {'error': 'Produto não encontrado.'}, 404

        db.session.delete(produto)
        db.session.commit()
        return '', 204

# Inicialização das rotas
api.add_resource(ProdutoResource, '/produtos')
api.add_resource(ProdutoByIdResource, '/produtos/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)