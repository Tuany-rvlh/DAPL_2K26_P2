const express = require('express');
const app = express();
app.use(express.json());
let estoque = [];


// POST - Cadastrar produto no estoque
app.post('/produto', (req, res) => {
    const produto = req.body;
    estoque.push(produto);
    res.json({
        msg: "Produto cadastrado com sucesso",
        produto: produto
    });

});

// GET - Buscar produto pelo ID usando query URL
app.get('/produto', (req, res) => {
    const id = Number(req.query.id);
    const produto = estoque.find(produto => produto.id === id);

    if(produto){
        res.send(`
            <h1>Produto encontrado</h1>
            <p>ID: ${produto.id}</p>
            <p>Nome: ${produto.nome}</p>
            <p>Preço: R$ ${produto.preco}</p>
            <p>Quantidade: ${produto.quantidade}</p>
        `);
    }else{
        res.status(404).send(`
            <h1>Produto não encontrado</h1>
        `);
    }
});

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});