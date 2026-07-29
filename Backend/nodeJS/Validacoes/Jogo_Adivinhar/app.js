const http = require('http');
const fs = require('fs');
const path = require('path');

let numeroSecreto = Math.floor(Math.random() * 50) + 1;
let tentativas = 0;
const maxTentativas = 5;

const server = http.createServer((req, res) => {

    const url = new URL(req.url, 'http://localhost:3000');
    const endpoint = url.pathname;

    // Página principal
    if(endpoint === '/'){

        const arquivo = path.join(__dirname, 'frontend.html');
        fs.readFile(arquivo, (err, content)=>{
            if(err){
                res.writeHead(500,{
                    'Content-Type':'text/plain'
                });
                res.end("Erro ao carregar página");
            }else{
                res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.end(content);
            }
        });
        return;
    }

    // Reiniciar jogo
    if(endpoint === '/reset'){
        numeroSecreto = Math.floor(Math.random() * 50) + 1;
        tentativas = 0;
        const arquivo = path.join(__dirname,'frontend.html');

        fs.readFile(arquivo,(err,content)=>{
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end(content);
        });
        return;
    }

    // Jogo
    if(endpoint === '/guess'){

        const numero = Number(url.searchParams.get('numero'));
        let resposta = "";
        if(isNaN(numero)){
            resposta = "Digite um número válido.";
            res.writeHead(200,{
                'Content-Type':'text/plain'
            });
            res.end(resposta);
            return;
        }

        tentativas++;
        console.log("Número secreto:", numeroSecreto);
        console.log("Tentativa:", numero);
        console.log("Tentativa:", tentativas);

        // Vitória
        if(numero === numeroSecreto){
            const arquivo = path.join(__dirname,'vitoria.html');

            fs.readFile(arquivo,(err,content)=>{
                res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.end(content);
            });
            numeroSecreto = Math.floor(Math.random()*50)+1;
            tentativas = 0;
            return;
        }

        // Derrota
        if(tentativas >= maxTentativas){
            const arquivo = path.join(__dirname,'perdeu.html');

            fs.readFile(arquivo,(err,content)=>{
                res.writeHead(200,{
                    'Content-Type':'text/html'
                });
                res.end(content);
            });

            numeroSecreto = Math.floor(Math.random()*50)+1;
            tentativas = 0;
            return;
        }

        // Dicas
        if(numero > numeroSecreto){
            resposta =
            `Seu número (${numero}) é MAIOR que o sorteado. Tentativa ${tentativas}/5`;
        }
        else{
            resposta =
            `Seu número (${numero}) é MENOR que o sorteado. Tentativa ${tentativas}/5`;
        }

        res.writeHead(200,{
            'Content-Type':'text/plain'
        });
        res.end(resposta);
        return;
    }

    // Erro
    res.writeHead(404,{
        'Content-Type':'text/plain'
    });
    res.end("Rota não encontrada");
});

server.listen(3000,()=>{
    console.log(
        "Servidor rodando em http://localhost:3000"
    );
});