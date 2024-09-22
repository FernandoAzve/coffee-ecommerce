import React from 'react';
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function PedidosAdmin() {
  return (
    <div className="home-page">
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/usuarios-admin">Usuários</a>
          <a href="/pedidos-admin">Pedidos</a>
          <a href="/estoque-admin">Estoque</a>
        </nav>
      </header>
      <div className="center-content">
        <h2>Pedidos</h2>
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>ID Usuário</th>
              <th>Produtos</th>
              <th>Valor</th>
              <th>Endereço</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#432</td>
              <td>#001</td>
              <td>1x Café Arábica, 2x Café Frutados, 1x Cafeteira</td>
              <td>R$ 601,00</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Processando
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <button className="dropdown-item" type="button">Pendente</button>
                    <button className="dropdown-item" type="button">Processando</button>
                    <button className="dropdown-item" type="button">Enviado</button>
                    <button className="dropdown-item" type="button">Entregue</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>#432</td>
              <td>#001</td>
              <td>1x Café Arábica, 2x Café Frutados, 1x Cafeteira</td>
              <td>R$ 601,00</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Processando
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <button className="dropdown-item" type="button">Pendente</button>
                    <button className="dropdown-item" type="button">Processando</button>
                    <button className="dropdown-item" type="button">Enviado</button>
                    <button className="dropdown-item" type="button">Entregue</button>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td>#432</td>
              <td>#001</td>
              <td>1x Café Arábica, 2x Café Frutados, 1x Cafeteira</td>
              <td>R$ 601,00</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Processando
                  </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                    <button className="dropdown-item" type="button">Pendente</button>
                    <button className="dropdown-item" type="button">Processando</button>
                    <button className="dropdown-item" type="button">Enviado</button>
                    <button className="dropdown-item" type="button">Entregue</button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default PedidosAdmin;