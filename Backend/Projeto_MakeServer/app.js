const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const maquiagens = [
  { id: 1,  nome: "Base Líquida Natural",        tipo: "base",        quantidade: 20 },
  { id: 2,  nome: "Base Líquida Matte",          tipo: "base",        quantidade: 18 },

  { id: 3,  nome: "Corretivo Claro",            tipo: "corretivo",   quantidade: 15 },
  { id: 4,  nome: "Corretivo Médio",            tipo: "corretivo",   quantidade: 17 },

  { id: 5,  nome: "Batom Matte Vermelho",       tipo: "batom",       quantidade: 25 },
  { id: 6,  nome: "Batom Cremoso Nude",         tipo: "batom",       quantidade: 22 },

  { id: 7,  nome: "Blush Rosé",                 tipo: "blush",       quantidade: 14 },
  { id: 8,  nome: "Blush Pêssego",              tipo: "blush",       quantidade: 16 },

  { id: 9,  nome: "Máscara de Cílios Volume",   tipo: "máscara",     quantidade: 19 },
  { id: 10, nome: "Máscara de Cílios Alonga",   tipo: "máscara",     quantidade: 21 },

  { id: 11, nome: "Paleta Nude",                tipo: "paleta",      quantidade: 12 },
  { id: 12, nome: "Paleta Colorida",            tipo: "paleta",      quantidade: 10 },

  { id: 13, nome: "Iluminador Champagne",       tipo: "iluminador",  quantidade: 13 },
  { id: 14, nome: "Iluminador Rosé Gold",       tipo: "iluminador",  quantidade: 11 }
];

const USUARIO_PADRAO = 'admin';
const SENHA_PADRAO = 'etefmc123';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {

    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if(usuario === USUARIO_PADRAO && senha === SENHA_PADRAO){
      res.status(200).json({
      mensagem: "200 - Login realizado com sucesso!"
      });
    }
    else{
      res.status(401).json({
      erro: "401 - Usuário ou senha incorretos."
      });
    }
});

app.get('/maquiagem',(req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'makeServer.html'));
});

app.get('/prod/maquiagem', (req, res) => {

  const tipo = req.query.tipo;

  if (!tipo) {
    return res.status(200).json(maquiagens);
  }

  const filtrados = [];

  for (let i = 0; i < maquiagens.length; i++) {

    if (maquiagens[i].tipo === tipo) {
      filtrados.push(maquiagens[i]);
    }

  }

  res.status(200).json(filtrados);


});

app.post('/carrinho', (req, res) => {

  const id = req.body.id;
  const quantidade = req.body.quantidade;
  const recebimento = req.body.recebimento;

  if (!id || !quantidade || !recebimento) {
    return res.status(400).json({
      erro: "400 - Envie id, quantidade e recebimento."
    });
  }

  if (id <= 0 || quantidade <= 0) {
    return res.status(400).json({
        erro: "400 - ID e quantidade devem ser maiores que zero."
    });
  }

  let produto = null;

  for (let i = 0; i < maquiagens.length; i++) {
    if (maquiagens[i].id === id) {
        produto = maquiagens[i];
    }
  }

  if (produto === null) {
    return res.status(404).json({
        erro: "404 - Produto não encontrado."
    });
  }

  if (quantidade > produto.quantidade) {
    return res.status(400).json({
        erro: "400 - Estoque insuficiente."
    });
  }

  produto.quantidade = produto.quantidade - quantidade;

  res.status(201).json({
      mensagem: "201 - Compra realizada com sucesso!"
  });

});

app.listen(3000, () => {
  console.log('Glow Beauty rodando em http://localhost:3000');
});