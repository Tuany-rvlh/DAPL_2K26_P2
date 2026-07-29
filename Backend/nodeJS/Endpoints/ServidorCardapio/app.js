//Importanto o módulo http
const http = require('http');

//criando o servidor
const server = http.createServer((req,res) =>{

    //Endpoint usado para segunda
    if(req.url === '/seg'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Bem-vindo ao cardápio do dia!

                Prato principal: arroz, feijão, batata-frita

                Carne: bife acebolado ou carne de porco

                Bebida: suco de laranja
                
                Salada: tomate e alface`);
    } 
    
    //Endpoint usado para terça
    else if(req.url === '/ter'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Bem-vindo ao cardápio do dia!

                Prato principal: arroz e tutu de feijão

                Carne: carne de panela 

                Bebida: Suco de abacaxi
                
                Salada: salada de maionese `);
    } 
    
    //Endpoint usado para quarta
    else if(req.url === '/qua'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Bem-vindo ao cardápio do dia!

                Prato principal: arroz e feijão preto(feijoada)

                Carne: cortes variados de carne suína que acompanha o feijão preto

                Bebida: Suco de laranja ou Coca-Cola
                
                Salada: couve refogada `);
    } 

    //Endpoint usado para quinta
    else if(req.url === '/qui'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Bem-vindo ao cardápio do dia!

                Prato principal: arroz e strogonoff

                Carne: frango(strogonoff)

                Bebida: Coca-Cola
                
                Salada: salpicão `);
    } 
    
        //Endpoint usado para sexta
    else if(req.url === '/sex'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Bem-vindo ao cardápio do dia!

                Prato principal: arroz e feijão tropeiro

                Carne: filé de frango ou file de peixe

                Bebida: suco de morango
                
                Salada: vinagrete `);
    } 

    //Se não for nenhum dos Endpoint -> erro 404
    else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Dia não encontrado.');
    }

});

//Especificando a porta          
const port = 3000;
server.listen(port,() => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});

