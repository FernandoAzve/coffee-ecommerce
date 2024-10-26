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
    from app.controller.ClienteAdminController import GetCliente, DeleteCliente
    from app.controller.CadastroAdminController import CadastroAdmin
    from app.controller.AdminController import GetAdm, DeleteAdm
    from app.controller.LoginAdminController import AdminLoginController
    from app.controller.CarrinhoController import CarrinhoController, DeduzirItemCarrinho, AdicionarItemCarrinho, ExcluirItemCarrinho, LimparCarrinho
    from app.controller.PedidoController import FinalizarPedido, MeusPedidos
    from app.controller.PedidosAdminController import TodosPedidos, AtualizarStatusPedido

    api.add_resource(ProdutoResource, '/produtos')
    api.add_resource(ProdutoByIdResource, '/produtos/<int:id>')

    api.add_resource(GetCliente, '/clientes')
    api.add_resource(DeleteCliente, '/clientes/<int:cliente_id>')

    api.add_resource(ClienteResource, '/cadastro')
    api.add_resource(LoginController, '/login')

    api.add_resource(GetAdm, '/admins')
    api.add_resource(DeleteAdm, '/admins/<int:adm_id>')
    api.add_resource(CadastroAdmin, '/admins')
    api.add_resource(AdminLoginController, '/admin/login')

    api.add_resource(CarrinhoController, '/carrinho')
    api.add_resource(DeduzirItemCarrinho, '/carrinho/<int:item_id>/deduzir')
    api.add_resource(AdicionarItemCarrinho, '/carrinho/<int:item_id>/adicionar')
    api.add_resource(ExcluirItemCarrinho, '/carrinho/<int:item_id>')
    api.add_resource(LimparCarrinho, '/carrinho/limpar')

    api.add_resource(FinalizarPedido, '/pedidos')
    api.add_resource(MeusPedidos, '/meus-pedidos')

    api.add_resource(TodosPedidos, '/todos-pedidos')
    api.add_resource(AtualizarStatusPedido, '/atualizar-status-pedido/<int:pedido_id>')

    return app