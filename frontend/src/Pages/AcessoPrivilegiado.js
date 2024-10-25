import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Importa o contexto de autenticação

const AcessoPrivilegiado = () => {
    const [admins, setAdmins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [novoAdmin, setNovoAdmin] = useState({ nome_adm: '', email_adm: '', senha_adm: '' });
    const [erro, setErro] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const { isAdminAuthenticated } = useAuth(); // Usa o estado de autenticação do admin

    // Verifica se o admin está autenticado
    useEffect(() => {
        if (!isAdminAuthenticated) {
            navigate('/login-admin'); // Redireciona para a página de login se não estiver autenticado
        } else {
            setIsLoading(false); // Desativa o carregamento quando autenticado
        }
    }, [isAdminAuthenticated, navigate]);

    // Exibe um spinner de carregamento enquanto verifica a autenticação
    if (isLoading) {
        return <div>Carregando...</div>;
    }

    // Função para buscar administradores
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

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="home-page">
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
                <h2>Administradores</h2>
                {isLoading ? (
                    <div>Carregando...</div>
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
        </div>
    );
};

export default AcessoPrivilegiado;