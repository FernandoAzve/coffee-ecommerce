CREATE TABLE cafe_mania_db.item_pedido (
    id_item_pedido INT NOT NULL AUTO_INCREMENT,
    id_pedido INT REFERENCES pedidos(id_pedido),
    id_produto INT REFERENCES produtos(id_produto),
    quantidade_item INT,
    preco_total_item DECIMAL(10, 2),
    PRIMARY KEY (id_item_pedido)
);
