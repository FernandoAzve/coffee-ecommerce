from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)

    # Configuração do banco de dados
    app.config.from_object('config.Config')

    # Inicializar o SQLAlchemy
    db.init_app(app)

    # Registrar as rotas dos recursos
    from app.resources.produto import ProdutoResource, ProdutoByIdResource
    api.add_resource(ProdutoResource, '/produtos')
    api.add_resource(ProdutoByIdResource, '/produtos/<int:id>')

    return app