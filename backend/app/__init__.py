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

    app.config.from_object('config.Config')

    db.init_app(app)

    from app.controller.ProdutoController import ProdutoResource, ProdutoByIdResource
    from app.controller.ClienteController import ClienteResource

    api.add_resource(ProdutoResource, '/produtos')
    api.add_resource(ProdutoByIdResource, '/produtos/<int:id>')
    api.add_resource(ClienteResource, '/clientes')

    return app