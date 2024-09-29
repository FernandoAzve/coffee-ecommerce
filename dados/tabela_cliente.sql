CREATE TABLE cafe_mania_db.clientes (
    id_cliente INT NOT NULL AUTO_INCREMENT,
    nome_cliente VARCHAR(100) NOT NULL,
    cpf_cliente CHAR(11) NOT NULL,
    email_cliente VARCHAR(256) NOT NULL,
    senha_hash_cliente VARCHAR(60) NOT NULL,
    endereco_logradouro_cliente VARCHAR(256) NOT NULL,
    endereco_bairro_cliente VARCHAR(256) NOT NULL,
    endereco_cidade_cliente VARCHAR(256) NOT NULL,
    endereco_estado_cliente VARCHAR(256) NOT NULL,
    endereco_numero_cliente VARCHAR(10) NOT NULL,
    endereco_complemento_cliente VARCHAR(256) NOT NULL,
    endereco_cep_cliente CHAR(8) NOT NULL,
    telefone_cliente CHAR(11) NOT NULL,
    PRIMARY KEY (id_cliente)
);