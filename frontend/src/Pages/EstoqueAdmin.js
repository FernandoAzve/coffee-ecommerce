import React, { useState, useEffect } from 'react';
import '../Styles/Admin.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

const EstoqueAdmin = () => {
  const [produtos, setProdutos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: '', quantidade: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/produtos')
      .then(response => {
        console.log('Produtos carregados:', response.data);
        setProdutos(response.data);
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleAddProduto = () => {
    const { nome, preco, quantidade } = novoProduto;

    if (!nome || !preco || !quantidade) {
      setErro('Todos os campos são obrigatórios.');
      return;
    }

    axios.post('http://localhost:5000/produtos', { nome, preco, quantidade })
      .then(response => {
        console.log('Produto adicionado:', response.data);
        setProdutos([...produtos, response.data]);
        setNovoProduto({ nome: '', preco: '', quantidade: '' });
        setErro('');
        setShowForm(false);
      })
      .catch(error => {
        console.error('Erro ao adicionar produto:', error);
        setErro('Erro ao adicionar produto.');
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
                <td>{produto.preco}</td>
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
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Adicionar Produto</button>
      </div>
      {showForm && (
        <div className="mt-3">
          <h3>Adicionar Novo Produto</h3>
          {erro && <div className="alert alert-danger">{erro}</div>}
          <form>
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={novoProduto.nome}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Preço</label>
              <input
                type="text"
                className="form-control"
                name="preco"
                value={novoProduto.preco}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Quantidade</label>
              <input
                type="number"
                className="form-control"
                name="quantidade"
                value={novoProduto.quantidade}
                onChange={handleInputChange}
              />
            </div>
            <button type="button" className="btn btn-success mt-2" onClick={handleAddProduto}>Registrar Produto</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EstoqueAdmin;