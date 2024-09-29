import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer-circle"></div>
    </div>
  );
};

const EstoqueAdmin = () => {
  const [produtos, setProdutos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [novoProduto, setNovoProduto] = useState({ nome_produto: '', preco_produto: '', quantidade_produto: '' });
  const [erro, setErro] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para controlar o botão
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        console.log('Produtos carregados:', response.data);
        setProdutos(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleAddProduto = () => {
    const { nome_produto, preco_produto, quantidade_produto } = novoProduto;
    if (!nome_produto || !preco_produto || !quantidade_produto) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    // Desabilitar o botão para evitar múltiplos cliques
    setIsButtonDisabled(true);

    axios.post('http://localhost:5000/produtos', { nome_produto, preco_produto, quantidade_produto })
      .then(response => {
        console.log('Produto adicionado:', response.data);
        setProdutos([...produtos, response.data]);
        setNovoProduto({ nome_produto: '', preco_produto: '', quantidade_produto: '' });
        setErro('');
        setShowForm(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        setErro('Erro ao adicionar produto.');
      })
      .finally(() => {
        setTimeout(() => {
          setIsButtonDisabled(false);
        }, 3000);
      });
  };

  const handleDeleteProduto = (id) => {
    const confirmDelete = window.confirm('Você tem certeza?');
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/produtos/${id}`)
        .then(() => {
          console.log('Produto excluído:', id);
          setProdutos(produtos.filter(produto => produto.id !== id));
        })
        .catch(error => console.error('Erro ao excluir produto:', error));
    }
  };

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
        <h2>Estoque</h2>
        {isLoading ? (
          <div className="shimmer-container">
            <Shimmer />
          </div>
        ) : (
          <table className="table-admin">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.id}</td>
                  <td>{produto.nome}</td>
                  <td>{`R$ ${produto.preco}`}</td> {/* Adiciona "R$ " na frente do preço */}
                  <td>{produto.quantidade}</td>
                  <td>
                    <button className="btn btn-link p-0" onClick={() => handleDeleteProduto(produto.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {!isLoading && (
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>Adicionar Produto</button>
        </div>
      )}

      {showForm && (
        <div className="mt-3">
          <h3>Adicionar Novo Produto</h3>
          {erro && <div className="alert alert-danger">{erro}</div>}
          <form>
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control" name="nome_produto" value={novoProduto.nome_produto} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Preço</label>
              <input type="text" className="form-control" name="preco_produto" value={novoProduto.preco_produto} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Quantidade</label>
              <input type="number" className="form-control" name="quantidade_produto" value={novoProduto.quantidade_produto} onChange={handleInputChange} />
            </div>
            <button type="button" className="btn btn-success mt-2" onClick={handleAddProduto} disabled={isButtonDisabled}>
              {isButtonDisabled ? 'Aguarde...' : 'Registrar Produto'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EstoqueAdmin;