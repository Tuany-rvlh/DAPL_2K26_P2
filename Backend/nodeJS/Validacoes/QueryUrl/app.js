const http = require('http');

const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url, 'http://localhost:3000');
    const endpoint = urlParams.pathname;

    if(endpoint === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end(`Olá, teste nossos endpoints com as seguintes URL
            
            http://localhost:3000/nome?nome=(seuNome)
            http://localhost:3000/nomeidade?nome=(seuNome)&idade=17
            http://localhost:3000/email?email=admin@etefmc.com.br`);
        return;
    }

    else if(endpoint === '/nome') {

        const nome = urlParams.searchParams.get('nome') || 'visitante';
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end(`Hello, ${nome}!`);
        return;
    }

    else if(endpoint ==='/nomeidade'){
        const nome = urlParams.searchParams.get('nome') || 'visitante';
        const idade = urlParams.searchParams.get('idade');
        var maiorMenor = "";
        if(idade >= 18){
            var maiorMenor = 'maior';
        }
        else{
            var maiorMenor = 'menor';
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello ${nome}, você é ${maiorMenor} de idade `); 
        return;
    }

    else if(endpoint === '/email'){
        const email = urlParams.searchParams.get('email') || 'nome@gmail.com.br';
        var sucesso = "";
        if(email == "admin@etefmc.com.br"){
            sucesso = 'Sucesso na resposta para esse email!'
        }
        else{
            sucesso = 'Não tivemos sucesso na resposta para esse email!'
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(sucesso);
    }

})

//Especificando a porta          
const port = 3000;
server.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});