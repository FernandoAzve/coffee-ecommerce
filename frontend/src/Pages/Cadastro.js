import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_cliente: '',
    cpf_cliente: '',
    email_cliente: '',
    senha_cliente: '',
    endereco_logradouro_cliente: '',
    endereco_bairro_cliente: '',
    endereco_cidade_cliente: '',
    endereco_estado_cliente: '',
    endereco_numero_cliente: '',
    endereco_complemento_cliente: '',
    endereco_cep_cliente: '',
    telefone_cliente: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Cadastro realizado com sucesso!\nFaça login para continuar.');
        console.log('Resposta do backend:', data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Erro ao realizar o cadastro.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setErrorMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="home-page">
      <Header />
      <h2 className="text-center mb-4 mt-4">Realize o Cadastro</h2>

      <form className="mx-auto" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="mb-3">
          <label className="form-label">Nome Completo</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-person"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Nome completo"
              name="nome_cliente"
              value={formData.nome_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">CPF</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-credit-card"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="CPF"
              name="cpf_cliente"
              value={formData.cpf_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-envelope"></i></span>
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              name="email_cliente"
              value={formData.email_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              name="senha_cliente"
              value={formData.senha_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <h5 className="mt-4">Endereço</h5>

        <div className="mb-3">
          <label className="form-label">Logradouro</label>
          <input
            type="text"
            className="form-control"
            placeholder="Logradouro"
            name="endereco_logradouro_cliente"
            value={formData.endereco_logradouro_cliente}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Número</label>
            <input
              type="text"
              className="form-control"
              placeholder="Número"
              name="endereco_numero_cliente"
              value={formData.endereco_numero_cliente}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Complemento</label>
            <input
              type="text"
              className="form-control"
              placeholder="Complemento"
              name="endereco_complemento_cliente"
              value={formData.endereco_complemento_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Bairro</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bairro"
              name="endereco_bairro_cliente"
              value={formData.endereco_bairro_cliente}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">CEP</label>
            <input
              type="text"
              className="form-control"
              placeholder="CEP"
              name="endereco_cep_cliente"
              value={formData.endereco_cep_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cidade"
              name="endereco_cidade_cliente"
              value={formData.endereco_cidade_cliente}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              placeholder="Estado"
              name="endereco_estado_cliente"
              value={formData.endereco_estado_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-telephone"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Telefone"
              name="telefone_cliente"
              value={formData.telefone_cliente}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100 py-2">Cadastrar-se</button>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Cadastro;