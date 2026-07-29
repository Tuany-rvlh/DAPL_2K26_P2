//Importanto o módulo http
const http = require('http');

//criando o servidor
const server = http.createServer((req,res) =>{

    //Endpoint usado para login
    if(req.url === '/login'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Login realizado com sucesso!');
    } 
    
    //Endpoint usado para dashbord
    else if(req.url === '/dashboard'){
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('Acesso negado. Faça login primeiro.');
    } 
    
    //Endpoint usado para admin
    else if(req.url === '/admin'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Você não tem permissão para acessar está área');
    } 
});

//Especificando a porta          
const port = 3000;
server.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});

//Explicação entre os códigos 401 e 403
//O erro 401 indica que o cliente deve se autenticar para obter a resposta solicitada
//O erro 403 indica que o cliente não tem direitos de acesso ao conteúdo; 
//ou seja, não é autorizado, portanto o servidor está se recusando a fornecer o recurso solicitado.