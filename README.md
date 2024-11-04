# Projeto Café Mania Ecommerce

## Índice

- [Projeto Café Mania Ecommerce](#projeto-café-mania-ecommerce)
  - [Índice](#índice)
  - [Descrição](#descrição)
  - [Pré-requisitos](#pré-requisitos)
  - [Como rodar o projeto localmente](#como-rodar-o-projeto-localmente)
    - [Frontend](#frontend)
    - [MySQL](#mysql)
    - [Backend](#backend)

## Descrição

O projeto Café Mania Ecommerce é uma aplicação completa de ecommerce para venda de cafés e acessórios. O projeto é dividido em duas partes principais: frontend e backend.

## Pré-requisitos

Certifique-se de ter as seguintes versões instaladas em seu ambiente:

- Node v20.16.0
- NPM v10.8.1
- Python v3.10.8
- pip v22.2.2
- MySQL

## Como rodar o projeto localmente

Após clonar o projeto em seu ambiente local, siga os passos abaixo:

### Frontend

1. Entre na pasta "frontend"
```sh
cd frontend
``` 
2. Rode o comando 
```sh
npm install
```
3. Com todas as dependências baixadas, rode o comando
```sh
npm start
```
4. Se tudo der certo, o site irá abrir no endereço ```http://localhost:3000/```

### MySQL

1. Para rodar o backend é necessário que você já tenha uma instância de MySQL em seu ambiente local
2. Ajuste o arquivo com nome ```.env``` na raíz da pasta ```backend```, com base nas suas credenciais do MySQL local
3. Seguindo isso, o backend será capaz de conectar na sua instância do MySQL
4. Ao configurar o MySQL em seu ambiente local, execute o script ```create_cafemaniadb.sql``` no MySQL para criar o banco de dados ```cafe_mania_db``` e suas tabelas.

### Backend

1. Abra um novo terminal e mantenha o terminal do frontend aberto
2. Rode o comando
```sh
cd backend
``` 
3. Nesse novo terminal rode o comando
```sh
pip install -r requirements.txt
```
4. Com todas as dependências instaladas corretamente, rode o comando
```sh
python run.py
```
5. Se tudo der certo, o seu backend irá iniciar no endereço ```http://localhost:5000```