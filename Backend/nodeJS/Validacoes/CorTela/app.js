const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url, 'http://localhost:3000');
    const endpoint = urlParams.pathname;

    if(endpoint === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end(`Olá, teste nossos endpoints com as seguintes URL
            
            http://localhost:3000/nome?cor=red
            http://localhost:3000/nome?cor=green
            http://localhost:3000/nome?cor=blue`);
        return;
    }

    else if(endpoint === '/nome') {

        const nome = urlParams.searchParams.get('cor') || 'visitante';

        if(nome == 'red'){
            fs.readFile('red.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 - Erro interno</h1>');
                } else {
                     res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
        else if(nome == 'green'){
            fs.readFile('green.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 - Erro interno</h1>');
                } else {
                     res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }
        else if(nome == 'blue'){
            fs.readFile('blue.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>500 - Erro interno</h1>');
                } else {
                     res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        }

    }

})

//Especificando a porta          
const port = 3000;
server.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});
