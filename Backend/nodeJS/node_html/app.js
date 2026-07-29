// Importando módulo http
const http = require('http');

// Criando o servidor
const server = http.createServer((req, res) => {

    // HTML da página
    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Servidor Node.js</title>
    </head>

    <body>
        <h1>Olá Mundo!</h1>
        <p>Esta página HTML está dentro do arquivo JavaScript.</p>
    </body>

    </html>
    `;

    // Resposta do servidor
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(html);

});

// Porta do servidor
const port = 3000;

// Inicia servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});