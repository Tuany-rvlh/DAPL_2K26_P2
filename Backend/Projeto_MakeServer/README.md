<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B0A45,25:7209B7,50:B5179E,75:F72585,100:FF8FAB&height=220&section=header&text=Glow%20Beauty%20API&fontSize=65&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>

<br>

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=24&duration=3000&pause=900&color=FF8FAB&center=true&vCenter=true&width=750&lines=Initializing+Glow+Beauty+API...;Loading+Express+Server...;Creating+REST+Endpoints...;Managing+Makeup+Inventory...;Testing+with+Postman...;API+Online+✓"/>

<br>

# 💄 Glow Beauty API 💄

### Desenvolvimento Backend com Node.js e Express

### Curso Técnico em Desenvolvimento de Sistemas

### Escola Técnica de Eletrônica Francisco Moreira da Costa (ETE FMC)

### Orientador: **Prof. Daniel Mosca**

### Dupla: **Mariana e Tuany**

<br>

![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-Framework-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![REST API](https://img.shields.io/badge/REST-API-7209B7?style=for-the-badge)
![JSON](https://img.shields.io/badge/JSON-Data-FF8FAB?style=for-the-badge)
![Postman](https://img.shields.io/badge/Postman-Testing-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

![Git](https://img.shields.io/badge/Git-Versionamento-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-Repositório-181717?style=for-the-badge&logo=github&logoColor=white)

<br>

---

</div>


# 💄 Sobre o projeto

A **Glow Beauty API** é uma aplicação backend desenvolvida utilizando **Node.js com Express**, simulando o funcionamento de uma loja virtual de maquiagens.

O sistema possui autenticação de usuários, consulta de produtos, filtros por categoria, gerenciamento de estoque e controle de compras através de um carrinho.

A comunicação entre cliente e servidor é realizada utilizando o formato **JSON**, com testes das requisições através do **Postman**.


---

# 🗂️ Sumário

- [💄 Sobre o projeto](#-sobre-o-projeto)
- [📁 Estrutura do projeto](#-estrutura-do-projeto)
- [📡 Contrato da API](#-contrato-da-api)
- [🧪 Testes no Postman](#-testes-no-postman)
- [▶️ Como executar](#️-como-executar)
- [🎯 Objetivos do projeto](#-objetivos-do-projeto)
- [📈 Status do projeto](#-status-do-projeto)


---

# 📁 Estrutura do projeto

```text
Glow_Beauty_API/
│
├── server.js
│
├── package.json
│
├── package-lock.json
│
├── public/
│   │
│   ├── home.html
│   ├── login.html
│   └── makeServer.html
│
└── README.md
```


---

# 📡 Contrato da API

## 🏠 Página inicial

| Método | Endpoint | Entrada | Resposta | Status |
|---|---|---|---|---|
| GET | `/` | Sem entrada | Página HTML de boas-vindas da loja. | 200 |


---

## 🔐 Login

| Método | Endpoint | Entrada | Resposta | Status |
|---|---|---|---|---|
| GET | `/login` | Sem entrada | Retorna página HTML de login. | 200 |
| POST | `/login` | Usuário e senha via JSON. | Retorna mensagem de sucesso ou erro de autenticação. | 200 ou 401 |


### Exemplo de requisição:

```json
{
  "usuario": "admin",
  "senha": "etefmc123"
}
```


### Login aprovado:

```json
{
  "mensagem": "200 - Login realizado com sucesso!"
}
```


### Login recusado:

```json
{
  "erro": "401 - Usuário ou senha incorretos."
}
```


---

# 💋 Produtos de maquiagem

| Método | Endpoint | Entrada | Resposta | Status |
|---|---|---|---|---|
| GET | `/maquiagem` | Sem entrada | Página HTML contendo os produtos. | 200 |
| GET | `/prod/maquiagem` | Filtro por query URL. | Lista de produtos em JSON. | 200 |


### Exemplo sem filtro:

```
GET /prod/maquiagem
```


Retorna todos os produtos:

```json
[
  {
    "id": 1,
    "nome": "Base Líquida Natural",
    "tipo": "base",
    "quantidade": 20
  }
]
```


### Exemplo com filtro:

```
GET /prod/maquiagem?tipo=batom
```


Resposta:

```json
[
  {
    "id": 5,
    "nome": "Batom Matte Vermelho",
    "tipo": "batom",
    "quantidade": 25
  },
  {
    "id": 6,
    "nome": "Batom Cremoso Nude",
    "tipo": "batom",
    "quantidade": 22
  }
]
```


---

# 🛒 Carrinho

| Método | Endpoint | Entrada | Resposta | Status |
|---|---|---|---|---|
| POST | `/carrinho` | ID do produto, quantidade e recebimento via JSON. | Adiciona produto, atualiza estoque ou retorna erro. | 201, 400 ou 404 |


### Exemplo de requisição:

```json
{
  "id": 5,
  "quantidade": 2,
  "recebimento": "entrega"
}
```


### Compra realizada:

```json
{
  "mensagem": "201 - Compra realizada com sucesso!"
}
```


### Erros possíveis:

Produto ou dados inválidos:

```json
{
  "erro": "400 - Envie id, quantidade e recebimento."
}
```


Produto inexistente:

```json
{
  "erro": "404 - Produto não encontrado."
}
```


Estoque insuficiente:

```json
{
  "erro": "400 - Estoque insuficiente."
}
```


---

# 🧪 Testes no Postman

Os testes da API foram realizados utilizando o **Postman**, verificando:

- Requisições GET;
- Requisições POST;
- Envio de dados JSON;
- Autenticação de usuário;
- Filtros através de query URL;
- Atualização de estoque;
- Respostas HTTP.


---

# ▶️ Como executar

## Requisitos

Necessário possuir:

- Node.js instalado;
- Visual Studio Code;
- Postman.


## Instalar dependências

```bash
npm install
```


## Executar servidor

```bash
node server.js
```


Servidor disponível:

```
http://localhost:3000
```


---

# 🎯 Objetivos do projeto

Este projeto tem como objetivos:

- 🚀 Criar uma API utilizando Express;
- 🌐 Entender comunicação cliente-servidor;
- 📦 Trabalhar manipulação de JSON;
- 🔐 Implementar autenticação;
- 💄 Gerenciar produtos de uma loja;
- 🛒 Desenvolver controle de estoque;
- 🧪 Realizar testes utilizando Postman;
- 🌳 Aplicar versionamento com Git e GitHub.


---

# 📈 Status do projeto

🟢 **Concluído**

A Glow Beauty API possui funcionalidades de login, consulta de produtos, filtros por categoria e gerenciamento de compras com atualização de estoque.


---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B0A45,25:7209B7,50:B5179E,75:F72585,100:FF8FAB&height=170&section=footer"/>

<br>

💄 💻 🚀 🌸

### Desenvolvido por

**Mariana e Tuany**

**Curso Técnico em Desenvolvimento de Sistemas**

**Escola Técnica de Eletrônica Francisco Moreira da Costa (ETE FMC)**

**2026**

<br>

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=18&duration=3000&pause=1000&color=FF8FAB&center=true&vCenter=true&width=650&lines=Glow+Beauty+API;Node.js+%7C+Express+%7C+JSON;REST+API+%7C+Postman+%7C+Backend;Building+Modern+Web+Services+💄"/>

</div>
