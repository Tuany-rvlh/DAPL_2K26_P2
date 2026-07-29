const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

    // Página inicial
    if (req.url === '/') {

        const filePath = path.join(__dirname, 'index.html');

        fs.readFile(filePath, (err, content) => {

            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                res.end(content);
            }

        });

    }


    // Código 100 - Informativo
    else if (req.url === '/status100') {

        res.writeHead(102, {
            'Content-Type': 'text/plain'
        });

        res.end(
            'Código 100: Continue - Resposta informativa do servidor.'
        );

    }


    // Código 200 - Sucesso
    else if (req.url === '/status200') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end(
            'Código 200: OK - Requisição realizada com sucesso.'
        );

    }


    // Código 300 - Redirecionamento
    else if (req.url === '/status300') {

        res.writeHead(302, {
            'Location': '/'
        });

        res.end();

    }


    // Código 400 - Erro do cliente
    else if (req.url === '/status400') {

        res.writeHead(400, {
            'Content-Type': 'text/plain'
        });

        res.end(
            'Código 400: Bad Request - Requisição inválida.'
        );

    }


    // Código 500 - Erro do servidor
    else if (req.url === '/status500') {

        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });

        res.end(
            'Código 500: Internal Server Error - Erro interno do servidor.'
        );

    }


    // Erro 404 personalizado
    else {

        const filePath = path.join(__dirname, '404.html');

        fs.readFile(filePath, (err, content) => {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            if (err) {

                res.end(`
                    <h1>404</h1>
                    <p>Página não encontrada.</p>
                `);

            } else {

                res.end(content);

            }

        });

    }

});


server.listen(3000, () => {

    console.log(
        'Servidor rodando em http://localhost:3000'
    );

});