CREATE TABLE cafe_mania_db.produtos (
    id_produto INT NOT NULL AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    quantidade_produto INT NOT NULL,
    preco_produto DECIMAL(14, 2) NOT NULL,
    PRIMARY KEY (id_produto)
);