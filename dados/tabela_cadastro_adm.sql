CREATE TABLE cafe_mania_db.cadastro_adm (
    id_adm INT NOT NULL AUTO_INCREMENT,
    nome_adm VARCHAR(100) NOT NULL,
    email_adm VARCHAR(256) NOT NULL,
    senha_hash_adm VARCHAR(60) NOT NULL,
    PRIMARY KEY (id_adm)
);