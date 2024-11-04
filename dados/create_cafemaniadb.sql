-- CREATE DATABASE
CREATE DATABASE cafe_mania_db;

-- CREATE TABLE CADASTRO ADMIN
CREATE TABLE cafe_mania_db.cadastro_adm (
    id_adm INT NOT NULL AUTO_INCREMENT,
    nome_adm VARCHAR(100) NOT NULL,
    email_adm VARCHAR(256) NOT NULL,
    senha_hash_adm VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_adm)
);

-- CREATE TABLE CADASTRO CLIENTE
CREATE TABLE cafe_mania_db.cadastro_clientes (
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

-- CREATE TABLE PRODUTOS ESTOQUE
CREATE TABLE cafe_mania_db.produtos_estoque (
    id_produto INT NOT NULL AUTO_INCREMENT,
    nome_produto VARCHAR(100) NOT NULL,
    quantidade_produto INT NOT NULL,
    preco_produto DECIMAL(14, 2) NOT NULL,
    categoria_produto VARCHAR(255),
    imagem_produto VARCHAR(255),
    PRIMARY KEY (id_produto)
);

-- CREATE TABLE CARRINHO
CREATE TABLE cafe_mania_db.carrinho (
  id_carrinho int NOT NULL AUTO_INCREMENT,
  id_cliente int DEFAULT NULL,
  id_produto int DEFAULT NULL,
  valor_unitario decimal(14,2) NOT NULL,
  quantidade  int DEFAULT NULL,
  PRIMARY KEY (id_carrinho),
  FOREIGN KEY (id_cliente) REFERENCES cafe_mania_db.cadastro_clientes(id_cliente),
  FOREIGN KEY (id_produto) REFERENCES cafe_mania_db.produtos_estoque(id_produto)
);

-- CREATE TABLE STATUS PEDIDO
CREATE TABLE cafe_mania_db.status_pedido (
    id_status INT NOT NULL AUTO_INCREMENT,
    nome_status VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_status)
);

-- CREATE TABLE PEDIDOS CLIENTES
CREATE TABLE cafe_mania_db.pedidos_clientes (
    id_pedido INT NOT NULL AUTO_INCREMENT,
    id_status INT,
    id_cliente INT,
    valor_compra DECIMAL(14,2) NOT NULL,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_pedido),
    FOREIGN KEY (id_status) REFERENCES cafe_mania_db.status_pedido(id_status),
    FOREIGN KEY (id_cliente) REFERENCES cafe_mania_db.cadastro_clientes(id_cliente)
);

-- CREATE TABLE ITEM PEDIDO
CREATE TABLE cafe_mania_db.item_pedido (
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos_clientes(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos_estoque(id_produto)
);

-- INSERT TABELA CADASTRO ADMIN
INSERT INTO cafe_mania_db.cadastro_adm (id_adm, nome_adm, email_adm, senha_hash_adm) VALUES
(1, 'Admin', 'admin@gmail.com', '$2b$12$c37woFX4iUFmAytROCUG6OaIPx8KJ7vPrLvVkfadAL6Ra7yW5y97u');

-- INSERT TABLE PRODUTOS ESTOQUE
INSERT INTO cafe_mania_db.produtos_estoque (id_produto, nome_produto, preco_produto, quantidade_produto, categoria_produto, imagem_produto) VALUES
(1, 'Cafeteira Lov', 249.90, 20, 'Acessórios', 'https://i.zst.com.br/thumbs/12/1e/1b/814869990.jpg'),
(2, 'Cafeteira Electrolux', 520.00, 2, 'Acessórios', 'https://electrolux.vtexassets.com/arquivos/ids/218298/CoffeeMaker_CMP70_Perspective_Electrolux_1000x1000-principal.jpg?v=637825293070300000'),
(3, 'Café Gourmet Sul De Minas 3 Corações 250g', 18.99, 50, 'Café Arábica', 'https://zonacerealista.com.br/cdn/shop/files/004475_H.jpg?v=1725755578'),
(4, 'Café Torrado e Moído Cerrado Mineiro Gourmet 3 Corações 250g', 15.98, 25, 'Café Arábica', 'https://domolivio.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fdomolivio.vtexassets.com%2Farquivos%2Fids%2F491651%2FCafe-Torrado-e-Moido-Cerrado-Mineiro-Gourmet-3-Coracoes-250g.jpg%3Fv%3D638549624998100000'),
(5, 'Café Torrado e Moído Região Vulcânica Gourmet Santa Clara Pacote 250g', 11.99, 10, 'Café Arábica', 'https://mercafefaststore.vtexassets.com/arquivos/ids/543258/SC-EMBALAGENS-RAIZES_LA_V14_REGIAO-VULCANICA.png?v=637904110976330000'),
(6, 'Café Moído Unique Frutado 500g', 112.10, 5, 'Café Frutado', 'https://images.tcdn.com.br/img/img_prod/1118791/cafe_especial_gourmet_torrado_e_moido_unique_frutado_500g_33_1_464cb5e53a3b7e68a739e835b317d6d7.jpg'),
(7, 'Café Melitta', 15.90, 150, 'Café Arábica', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOk1vdVLq4K8ij-IcMd3f7GkjWCAj0evuYyA&s'),
(8, 'Café Pelé', 13.95, 15, 'Café Arábica', 'https://io.convertiez.com.br/m/superpaguemenos/shop/products/images/22674/medium/cafe-pele-extra-forte-500g_75661.png'),
(9, 'Cafeteira Dolce Gusto', 480.00, 10, 'Acessórios', 'https://www.nescafe-dolcegusto.com.br/media/catalog/product/cache/d22af66f75f51f60e100631e2c10a99a/m/i/minime_preta_1_1.webp'),
(10, 'Baggio Aromas Chocolate Trufado - 250g', 25.90, 25, 'Café Frutado', 'https://baggiocafe.com.br/cdn/shop/products/BaggioAromasChocolateTrufado250g.png?v=1658265915'),
(11, 'Café Unique Frutado 250g', 34.85, 12, 'Café Frutado', 'https://uniquecafes.com.br/wp-content/uploads/2020/03/Frutado-Capa-Novo.png');

-- INSERT TABLE STATUS PEDIDO
INSERT INTO `cafe_mania_db`.`status_pedido`
(`id_status`,
`nome_status`)
VALUES
(1, 'Pedido Realizado'),
(2, 'Processando'),
(3, 'Enviado'),
(4, 'Entregue'),
(5, 'Cancelado');