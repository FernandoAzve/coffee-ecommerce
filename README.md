# Projeto Café Mania Ecommerce

## Pré-requisitos

1. Node v20.16.0
2. NPM v10.8.1
3. Python v3.10.8
4. pip v22.2.2

## Como rodar o projeto localmente

Após clonar o projeto em seu ambiente local, siga os passos abaixo:

### Frontend

1. Entre na pasta "frontend" e rode o comando ```npm install```
2. Com todas as dependências baixadas, rode o comando ```npm start```
3. Se tudo der certo, o site irá abrir no endereço ```http://localhost:3000/```

### MySQL

1. Para rodar o backend é necessário que você já tenha uma instância de MySQL em seu ambiente local
2. Crie um arquivo com nome ```.env``` na raíz da pasta ```backend```
3. Dentro desse arquivo crie a variável ```SQLALCHEMY_DATABASE_URL = mysql://USER:PASSWORD@localhost:PORT/DB_NAME```
4. Seguindo isso, o backend será capaz de conectar na sua instância do MySQL
5. Ao configurar o MySQL em seu ambiente local, execute o script ```create_cafemaniadb.sql``` no MySQL para criar o banco de dados ```cafe_mania_db``` e suas tabelas.

### Backend

1. Abra um novo terminal e mantenha o terminal do frontend aberto
2. Nesse novo terminal rode o comando ```pip install -r requirements.txt```
3. Com todas as dependências instaladas corretamente, rode o comando ```python app.py```
4. Se tudo der certo, o seu backend irá iniciar no endereço ```http://localhost:5000```

