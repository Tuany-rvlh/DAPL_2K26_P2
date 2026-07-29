/*
Exercício 2 – Animação de um quadrado

Desenvolva uma animação utilizando a API Canvas do HTML5 contendo um
quadrado em movimento.

Requisitos:
• O quadrado deve se movimentar continuamente nas direções horizontal
e vertical utilizando as variáveis de velocidade dx e dy.

• A cada quadro da animação, as coordenadas x e y devem ser atualizadas
somando seus respectivos valores de velocidade.

• Sempre que o quadrado atingir qualquer uma das bordas do canvas,
o sentido do movimento deverá ser invertido, mantendo o objeto
sempre totalmente visível na tela.
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
    c.fillRect(x, y, tamquad, tamquad);

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