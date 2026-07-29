/*
Exercício 1 – Animação de dois quadrados

Desenvolva uma animação utilizando a API Canvas do HTML5 contendo dois
quadrados.

• O primeiro quadrado deve se movimentar continuamente na horizontal
(esquerda e direita), invertendo automaticamente o sentido ao atingir
as bordas laterais do canvas.

• O segundo quadrado deve se movimentar continuamente na vertical
(cima e baixo), invertendo automaticamente o sentido ao atingir
as bordas superior e inferior do canvas.

Os dois objetos devem permanecer sempre visíveis na tela durante toda
a execução da animação.
*/

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var x = 200; // Posição Inicial
var y = 200; // Posição Inicial
var dx = 4; // Velocidade do movimento
var dy = 4 // Velocidade do moviento
var tamquad = 100; // Tamanho do quadrado

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight); // Apaga toda a tela

    c.fillStyle = "#00ff73";
    c.fillRect(x, 200, tamquad, tamquad);

    c.fillStyle = "#c8ff00";
    c.fillRect(200, y, tamquad, tamquad);



    //Se a borda do quadrado chegar ao limite(esquerdo), inverte a velocidade
    if((x + tamquad) >= innerWidth){
        dx = -dx;
    }

    //Se a borda do quadrado chegar ao limite(direito), inverter a velocidade
    if(x <= 0){
        dx = -dx;
    }

    //Se a borda do quadrado chegar ao limite(inferior), inverte a velocidade
    if((y + tamquad) >= innerHeight){
        dy = -dy;
    }

    //Se a borda do quadrado chegar ao limite(superior), inverter a velocidade
    if(y <= 0){
        dy = -dy;
    }

    x = x+dx;
    y = y+dy;

}

animate();