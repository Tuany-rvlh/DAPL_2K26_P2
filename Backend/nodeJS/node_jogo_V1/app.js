const http = require('http');

const server = http.createServer((req, res) => {

    const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jogo</title>

        <style>
            canvas {
                border: 1px solid black;
            }

            body {
                margin: 0;
                overflow: hidden;
            }
        </style>

    </head>

    <body>

        <canvas></canvas>

        <script>

            var canvas = document.querySelector('canvas');

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            var c = canvas.getContext('2d');

            var velocidade = 3;

            var x = 60;
            var y = 80;

            var tremerXC = 0.1;
            var xc = 676;

            var teclas = {};

            var coletados = 0;


            document.addEventListener("keydown", (event) => {
                teclas[event.key] = true;
            });


            document.addEventListener("keyup", (event) => {
                teclas[event.key] = false;
            });


            var pontos = [];


            for (var i = 0; i < 25; i++) {

                pontos.push({
                    w: random(0, canvas.width - 16),
                    z: random(0, canvas.height - 16)
                });

            }


            function animate(){

                requestAnimationFrame(animate);


                c.fillStyle = '#000000';

                c.fillRect(0, 0, canvas.width, canvas.height);


                c.fillStyle = "#ffffff";

                c.font = "30px Arial";

                c.fillText(coletados + "/25", canvas.width - 100, 40);



                c.beginPath();

                c.arc(xc, 322, 35, 0, Math.PI * 2, false);

                c.fillStyle = "#ffffff";

                c.fill();



                if(xc + tremerXC > 690){
                    tremerXC = -tremerXC;
                }


                if(xc + tremerXC < 670){
                    tremerXC = -tremerXC;
                }


                xc += tremerXC;



                c.clearRect(x, y, 35, 35);


                c.fillStyle = "#d805fe";



                if(teclas["ArrowUp"])
                    y -= velocidade;


                if(teclas["ArrowDown"])
                    y += velocidade;


                if(teclas["ArrowLeft"])
                    x -= velocidade;


                if(teclas["ArrowRight"])
                    x += velocidade;



                if (
                    x + 35 > xc - 35 &&
                    x < xc + 35 &&
                    y + 35 > 322 - 35 &&
                    y < 322 + 35
                ){

                    x = 60;
                    y = 80;
                    coletados = 0;

                    pontos = [];

                    for(var i = 0; i < 25; i++){

                        pontos.push({
                            w: random(0, canvas.width - 16),
                            z: random(0, canvas.height - 16)
                        });

                    }

                }



                c.fillRect(x, y, 35, 35);



                if(x + 35 > canvas.width){

                    x = 60;
                    y = 80;

                }


                if(y + 35 > canvas.height){

                    x = 60;
                    y = 80;

                }


                if(y + 35 < 0){

                    x = 60;
                    y = 80;

                }


                if(x + 35 < 0){

                    x = 60;
                    y = 80;

                }



                for(var i = pontos.length - 1; i >= 0; i--){


                    var dx = xc - pontos[i].w;

                    var dy = 322 - pontos[i].z;



                    if(tremerXC > 0){

                        pontos[i].w += dx * 0.001;
                        pontos[i].z += dy * 0.001;

                    }



                    if(tremerXC < 0){

                        pontos[i].w -= dx * 0.001;
                        pontos[i].z -= dy * 0.001;

                    }



                    c.beginPath();

                    c.arc(
                        pontos[i].w,
                        pontos[i].z,
                        8,
                        0,
                        Math.PI * 2,
                        false
                    );


                    c.fillStyle = "#ffff2f";

                    c.fill();



                    if(
                        pontos[i].w + 8 > x &&
                        pontos[i].w - 8 < x + 35 &&
                        pontos[i].z + 8 > y &&
                        pontos[i].z - 8 < y + 35
                    ){

                        pontos.splice(i,1);

                        coletados++;

                    }

                }



                if(coletados == 25 && pontos.length === 0){

                    c.fillStyle = "#ffffff";

                    c.font = "80px Arial";


                    var texto = "FIM DE JOGO";


                    var larguraTexto = c.measureText(texto).width;


                    c.fillText(
                        texto,
                        (canvas.width - larguraTexto) / 2,
                        canvas.height / 2
                    );

                }

            }



            function random(min,max){

                return Math.random() * (max - min) + min;

            }



            animate();


        </script>

    </body>
    </html>
    `;


    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });


    res.end(html);

});


const port = 3000;


server.listen(port, () => {

    console.log(`Servidor rodando em http://localhost:${port}`);

});