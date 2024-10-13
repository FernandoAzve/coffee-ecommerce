CREATE TABLE cafe_mania_db.carrinho (
  `id_carrinho` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  `valor_unitario` decimal(14,2) NOT NULL,
  `quantidade`  int DEFAULT NULL,
  PRIMARY KEY (`id_carrinho`),
  FOREIGN KEY (id_cliente) REFERENCES cafe_mania_db.cadastro_clientes(id_cliente),
  FOREIGN KEY (id_produto) REFERENCES cafe_mania_db.produtos_estoque(id_produto)
);
