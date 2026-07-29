const express = require('express');

const app = express();

app.use(express.json());

// Usuário padrão para login
const usuarioPadrao = {
    email: "tuany@email.com",
    senha: "senha123"
};

// Rota home
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 4) Login recebendo usuário e senha
app.post('/login', (req, res) => {
    const dados = req.body.login;
    res.json({
        msg: "Dados recebidos com sucesso",
        email: dados.email,
        senha: dados.senha
    });
});

// 5) Endpoint para calcular idade
app.post('/idade', (req, res) => {
    const anoNascimento = req.body.ano;
    const idade = new Date().getFullYear() - anoNascimento;
    res.json({
        anoNascimento: anoNascimento,
        idade: idade
    });

});

// 6) Login com acesso protegido à página Home
app.post('/entrar', (req, res) => {

    const email = req.body.login.email;
    const senha = req.body.login.senha;


    if(email == usuarioPadrao.email && senha == usuarioPadrao.senha){
        res.sendFile(__dirname + '/index.html');
    }else{

        res.status(401).json({
            msg: "Email ou senha incorretos"
        });

    }

});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});