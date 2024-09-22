import '../Styles/MeusPedidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MeusPedidos() {
  return (
    <div className="home-page">
      <div className="top-bar">
        <a href="/dicas">Dicas</a>
        <a href="/certificacoes">Certificações</a>
      </div>
      <header className="header">
        <div className="logo">LOGO</div>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/cursos">Cursos</a>
          <a href="/arabica">Cafés Arábica</a>
          <a href="/frutados">Cafés Frutados</a>
          <a href="/acessorios">Acessórios</a>
          <a href="/carrinho">
            <i className="bi bi-cart"></i>
          </a>
          <a href="/login">Login</a>
          <a href="/cadastro">Cadastre-se</a>
        </nav>
      </header>
      <div className="center-content">
        <h2>Meus pedidos</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID Pedido</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Previsão de entrega</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#125</td>
              <td>R$ 36,00</td>
              <td>Em preparação</td>
              <td>31/12/2024</td>
            </tr>
            <tr>
              <td>#125</td>
              <td>R$ 36,00</td>
              <td>Em preparação</td>
              <td>31/12/2024</td>
            </tr>
            <tr>
              <td>#125</td>
              <td>R$ 36,00</td>
              <td>Em preparação</td>
              <td>31/12/2024</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MeusPedidos;