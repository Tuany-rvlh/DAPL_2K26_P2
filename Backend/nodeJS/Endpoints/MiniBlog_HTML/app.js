//Importanto o módulo http
const http = require('http');

//Importanto o módulo fs
const fs = require('fs');

//criando o servidor
const server = http.createServer((req,res) =>{

    fs.readFile('index.html', (err, data) => {
        //Endpoint usado para a rota /
        if(req.url === '/'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        } 
    });

    fs.readFile('index.html', (err, data) => {
        //Endpoint usado para a rota /post1
        if(req.url === '/post1'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        } 


});

});

//Especificando a porta          
const port = 3000;
server.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});

