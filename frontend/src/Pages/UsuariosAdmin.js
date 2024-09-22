import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function UsuariosAdmin() {
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
        <h2>Usuários</h2>
        <table className="table-admin">
          <thead>
            <tr>
              <th>ID Usuário</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CEP</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>Fernando Azevedo</td>
              <td>fernando@gmail.com</td>
              <td>123.456.789.01</td>
              <td>1191234-5678</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <button className="btn btn-link p-0">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>#002</td>
              <td>Fernando Azevedo</td>
              <td>fernando@gmail.com</td>
              <td>123.456.789.01</td>
              <td>1191234-5678</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <button className="btn btn-link p-0">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td>#003</td>
              <td>Fernando Azevedo</td>
              <td>fernando@gmail.com</td>
              <td>123.456.789.01</td>
              <td>1191234-5678</td>
              <td>Rua Joao Maria, 10, Bairro, Itaquaquecetuba, 01234-560, Rua sem saída</td>
              <td>
                <button className="btn btn-link p-0">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsuariosAdmin;