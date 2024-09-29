import { useNavigate } from 'react-router-dom';
import '../Styles/Carrinho.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function Carrinho() {
  const navigate = useNavigate();

  const handleFinalizarCompra = () => {
    navigate('/finalizar-pedido');
  };

  return (
    <div className="home-page">

      <TopBar />

      <Header />

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