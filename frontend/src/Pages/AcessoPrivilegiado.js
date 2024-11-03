import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../AdminAuthContext';
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const Shimmer = () => {
    return (
        <div className="shimmer-wrapper">
            <div className="shimmer-circle"></div>
        </div>
    );
};

function AcessoPrivilegiado() {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [novoAdmin, setNovoAdmin] = useState({
        nome_adm: '',
        email_adm: '',
        senha_adm: ''
    });
    const [erro, setErro] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const { isAdminAuthenticated, logoutAdmin } = useAdminAuth();

    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigate('/login-admin');
        } else {
            setIsLoading(false);
        }
    }, [isAdminAuthenticated, navigate]);

    const fetchAdmins = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/admins');
            setAdmins(response.data);
        } catch (error) {
            console.error('Erro ao buscar administradores:', error);
            setErro('Erro ao buscar administradores.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAdmin = async (id) => {
        if (admins.length === 1) {
            setErro('Não é possível excluir o único administrador.');
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
            return;
        }

        const confirmDelete = window.confirm('Você tem certeza que deseja excluir este administrador?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/admins/${id}`);
                setAdmins(prevAdmins => prevAdmins.filter(admin => admin.id !== id));
                console.log('Administrador excluído:', id);
            } catch (error) {
                console.error('Erro ao excluir administrador:', error);
                setErro('Erro ao excluir administrador.');
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNovoAdmin({ ...novoAdmin, [name]: value });
    };

    const handleAddAdmin = async () => {
        const { nome_adm, email_adm, senha_adm } = novoAdmin;
        if (!nome_adm || !email_adm || !senha_adm) {
            setErro('Todos os campos são obrigatórios.');
            return;
        }

        setIsButtonDisabled(true);

        try {
            await fetchAdmins();
            setNovoAdmin({ nome_adm: '', email_adm: '', senha_adm: '' });
            setErro('');
            setShowForm(false);
        } catch (error) {
            console.error('Erro ao adicionar administrador:', error);
            setErro('Erro ao adicionar administrador.');
        } finally {
            setIsButtonDisabled(false);
        }
    };

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="home-page">
            <header className="header">
                <div className="logo-container">
                    <Link to="/estoque-admin">
                        <img src="/logo_cafe_mania.png" alt="Logo" className="logo-img" />
                    </Link>
                </div>
                <nav className="nav">
                    <a href="/usuarios-admin">Usuários</a>
                    <a href="/pedidos-admin">Pedidos</a>
                    <a href="/estoque-admin">Estoque</a>
                    <a href="/acesso-privilegiado">Acesso Privilegiado</a>
                    <button onClick={logoutAdmin} className='logout-button'>Logout</button>
                </nav>
            </header>

            <div className="center-content">
                <h2>Administradores</h2>
                {isLoading ? (
                    <div className="shimmer-container">
                        <Shimmer />
                    </div>
                ) : (
                    <table className="table-admin">
                        <thead>
                            <tr>
                                <th>ID Admin</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.id}</td>
                                    <td>{admin.nome}</td>
                                    <td>{admin.email}</td>
                                    <td>
                                        <button className="btn btn-link p-0" onClick={() => handleDeleteAdmin(admin.id)}>
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
                    <button className="btn btn-primary" onClick={() => setShowForm(true)}>Cadastrar Novo Administrador</button>
                </div>
            )}

            {showForm && (
                <div className="mt-3">
                    <h3>Adicionar Novo Administrador</h3>
                    {erro && <div className="alert alert-danger">{erro}</div>}
                    <form>
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome_adm"
                                value={novoAdmin.nome_adm}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email_adm"
                                value={novoAdmin.email_adm}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input
                                type="password"
                                className="form-control"
                                name="senha_adm"
                                value={novoAdmin.senha_adm}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mt-2"
                            onClick={handleAddAdmin}
                            disabled={isButtonDisabled}
                        >
                            {isButtonDisabled ? 'Aguarde...' : 'Registrar Administrador'}
                        </button>
                    </form>
                </div>
            )}
            {showErrorMessage && (
                <div className="error-message">
                    Não é possível excluir o único administrador.
                </div>
            )}
        </div>
    );
}

export default AcessoPrivilegiado;