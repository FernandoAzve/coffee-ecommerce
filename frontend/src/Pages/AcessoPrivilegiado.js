import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useAdminAuth } from '../AdminAuthContext'; // Importa o contexto de autenticação

const AcessoPrivilegiado = () => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [novoAdmin, setNovoAdmin] = useState({ nome_adm: '', email_adm: '', senha_adm: '' });
    const [erro, setErro] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const { isAdminAuthenticated } = useAdminAuth(); // Usa o estado de autenticação do admin

    // Verifica se o admin está autenticado
    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigate('/login-admin'); // Redireciona para a página de login se não estiver autenticado
        } else {
            setIsLoading(false); // Desativa o carregamento quando autenticado
        }
    }, [isAdminAuthenticated, navigate]);

    // Função para buscar administradores
    const fetchAdmins = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('/api/admins');
            setAdmins(response.data);
        } catch (error) {
            console.error('Erro ao buscar administradores:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Função para adicionar um novo administrador
    const handleAddAdmin = async (e) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        try {
            await axios.post('/api/admins', novoAdmin);
            setNovoAdmin({ nome_adm: '', email_adm: '', senha_adm: '' });
            fetchAdmins();
            setShowForm(false);
        } catch (error) {
            setErro('Erro ao adicionar administrador');
            console.error('Erro ao adicionar administrador:', error);
        } finally {
            setIsButtonDisabled(false);
        }
    };

    // Função para deletar um administrador
    const handleDeleteAdmin = async (id) => {
        try {
            await axios.delete(`/api/admins/${id}`);
            fetchAdmins();
        } catch (error) {
            console.error('Erro ao deletar administrador:', error);
        }
    };

    // Exibe um spinner de carregamento enquanto verifica a autenticação
    if (isLoading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="admin-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav">
                    <a href="/usuarios-admin">Usuários</a>
                    <a href="/pedidos-admin">Pedidos</a>
                    <a href="/estoque-admin">Estoque</a>
                    <a href="/acesso-privilegiado">Acesso Privilegiado</a>
                </nav>
            </header>
            <div className="center-content">
                <h2>Acesso Privilegiado</h2>
                <button onClick={() => setShowForm(!showForm)}>Adicionar Administrador</button>
                {showForm && (
                    <form onSubmit={handleAddAdmin}>
                        <input
                            type="text"
                            value={novoAdmin.nome_adm}
                            onChange={(e) => setNovoAdmin({ ...novoAdmin, nome_adm: e.target.value })}
                            placeholder="Nome"
                            required
                        />
                        <input
                            type="email"
                            value={novoAdmin.email_adm}
                            onChange={(e) => setNovoAdmin({ ...novoAdmin, email_adm: e.target.value })}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="password"
                            value={novoAdmin.senha_adm}
                            onChange={(e) => setNovoAdmin({ ...novoAdmin, senha_adm: e.target.value })}
                            placeholder="Senha"
                            required
                        />
                        <button type="submit" disabled={isButtonDisabled}>
                            {isButtonDisabled ? 'Adicionando...' : 'Adicionar'}
                        </button>
                        {erro && <p>{erro}</p>}
                    </form>
                )}
                <table className="table-admin">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td>{admin.id}</td>
                                <td>{admin.nome_adm}</td>
                                <td>{admin.email_adm}</td>
                                <td>
                                    <button onClick={() => handleDeleteAdmin(admin.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AcessoPrivilegiado;