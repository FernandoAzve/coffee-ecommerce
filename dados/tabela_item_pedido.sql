CREATE TABLE cafe_mania_db.item_pedido (
    id_pedido INT,
    id_produto INT,
    quantidade INT NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedidos_clientes(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produtos_estoque(id_produto)
);