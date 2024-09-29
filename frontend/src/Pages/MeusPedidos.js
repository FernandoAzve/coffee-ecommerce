import '../Styles/MeusPedidos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import TopBar from '../Components/TopBar';

function MeusPedidos() {
  return (
    <div className="home-page">

      <TopBar />

      <Header />

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