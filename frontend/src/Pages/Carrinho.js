import { useNavigate } from 'react-router-dom';
import '../Styles/Carrinho.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Carrinho() {
  const navigate = useNavigate();

  const handleFinalizarCompra = () => {
    navigate('/finalizar-pedido');
  };

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
        <h2>Carrinho</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID Item</th>
              <th>Produto</th>
              <th>Valor Unitário</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#125</td>
              <td>Café 100% Arábica</td>
              <td>R$ 18,00</td>
              <td>R$ 36,00</td>
              <td>
                2 <button className="btn btn-link p-0"><i className="bi bi-pencil"></i></button>
              </td>
              <td>
                <button className="btn btn-link p-0"><i className="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td>#187</td>
              <td>Café Frutado</td>
              <td>R$ 12,00</td>
              <td>R$ 66,00</td>
              <td>
                3 <button className="btn btn-link p-0"><i className="bi bi-pencil"></i></button>
              </td>
              <td>
                <button className="btn btn-link p-0"><i className="bi bi-trash"></i></button>
              </td>
            </tr>
            <tr>
              <td>#105</td>
              <td>Cafeteira</td>
              <td>R$ 499,00</td>
              <td>R$ 499,00</td>
              <td>
                1 <button className="btn btn-link p-0"><i className="bi bi-pencil"></i></button>
              </td>
              <td>
                <button className="btn btn-link p-0"><i className="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="total-container">
          <div className="total">
            <span>Total: R$ 601,00</span>
          </div>
          <div className="finalizar-compra">
            <button className="btn btn-primary" onClick={handleFinalizarCompra}>
              Finalizar compra
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Carrinho;