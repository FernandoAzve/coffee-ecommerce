import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function NotFound() {
    return (
        <div className="container text-center" style={{ marginTop: '50px' }}>
            <h1>404 - Página Não Encontrada</h1>
            <p>Desculpe, a página que você está procurando não existe.</p>
            <Link to="/" className="btn btn-primary">
                Voltar para a Página Inicial
            </Link>
        </div>
    );
}

export default NotFound;