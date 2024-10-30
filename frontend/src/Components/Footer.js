import React from 'react';
import '../Styles/FooterStyles.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h2>Café Mania</h2>
                <p>Projeto Integrador Transdisciplinar em Ciência da Computação II</p>
                <p>
                    <i className="bi bi-c-circle"></i> 2024  Desenvolvido por Fernando Martins dos Santos Azevedo e Aline Martins Lima
                </p>
            </div>
        </footer>
    );
}

export default Footer;