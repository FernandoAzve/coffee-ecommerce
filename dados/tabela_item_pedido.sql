CREATE TABLE cafe_mania_db.item_pedido (
    id_item_pedido INT NOT NULL AUTO_INCREMENT,
    id_pedido INT DEFAULT NULL,
    id_produto INT DEFAULT NULL,
    quantidade_item INT,
    preco_total_item DECIMAL(10, 2),
    PRIMARY KEY (id_item_pedido),
    FOREIGN KEY (id_pedido) REFERENCES cafe_mania_db.pedidos_clientes(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES cafe_mania_db.produtos_estoque(id_produto)
);