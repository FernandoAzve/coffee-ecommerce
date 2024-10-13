CREATE TABLE cafe_mania_db.produtos_estoque (
    id_produto INT NOT NULL AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    quantidade_produto INT NOT NULL,
    preco_produto DECIMAL(14, 2) NOT NULL,
    categoria_produto VARCHAR(255),
    imagem_produto VARCHAR(255),
    PRIMARY KEY (id_produto)
);