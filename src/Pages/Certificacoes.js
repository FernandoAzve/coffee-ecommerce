import React from 'react';

function Certificacoes() {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>

            <div className="top-bar">
                <a href="/dicas">Dicas</a>
                <a href="/certificacoes">Certificações</a>
            </div>
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="nav">
                    <a href="/">Home</a>
                    <a href="/cursos">Cursos</a>
                    <a href="/arabica">Cafés Arábica</a>
                    <a href="/frutados">Cafés Frutados</a>
                    <a href="/acessorios">Acessórios</a>
                    <a href="/login">Login</a>
                    <a href="/cadastro">Cadastre-se</a>
                </nav>
            </header>

            <h2>Certificações</h2>
            <p>
                Explore nosso compromisso com a sustentabilidade e a qualidade por meio de nossas certificações e práticas responsáveis. Descubra cafés provenientes de fontes éticas e ambientalmente conscientes, garantindo não apenas uma xícara excepcional, mas também um impacto positivo no mundo do café.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px'
                }}>
                    <span>Certificação 1</span>
                </div>
                <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px'
                }}>
                    <span>Certificação 2</span>
                </div>
                <div style={{
                    width: '150px',
                    height: '150px',
                    backgroundColor: '#ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '10px'
                }}>
                    <span>Certificação 3</span>
                </div>
            </div>
        </div>
    );
}

export default Certificacoes;
