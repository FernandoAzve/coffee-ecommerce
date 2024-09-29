CREATE TABLE cafe_mania_db.status_pedido (
    id_status INT NOT NULL AUTO_INCREMENT,
    nome_status VARCHAR(100) NOT NULL,
    PRIMARY KEY (id_status)
);

INSERT INTO `cafe_mania_db`.`status_pedido`
(`id_status`,
`nome_status`)
VALUES
(1, 'Pedido Realizado'),
(2, 'Processando'),
(3, 'Enviado'),
(4, 'Entregue'),
(5, 'Cancelado');