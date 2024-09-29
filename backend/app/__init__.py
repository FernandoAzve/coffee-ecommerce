from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from app.utils.MiddlewareAuth import authenticate_token

load_dotenv()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    api = Api(app)

    app.config.from_object('config.Config')

    db.init_app(app)

    from app.controller.ProdutoController import ProdutoResource, ProdutoByIdResource
    from app.controller.CadastroController import ClienteResource
    from app.controller.LoginController import LoginController

    api.add_resource(ProdutoResource, '/produtos', resource_class_kwargs={'decorators': [authenticate_token]})
    api.add_resource(ProdutoByIdResource, '/produtos/<int:id>', resource_class_kwargs={'decorators': [authenticate_token]})
    
    api.add_resource(ClienteResource, '/cadastro')
    api.add_resource(LoginController, '/login')

    return app