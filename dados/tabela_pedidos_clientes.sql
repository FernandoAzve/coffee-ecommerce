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