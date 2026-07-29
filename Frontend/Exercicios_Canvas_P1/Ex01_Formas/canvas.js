/*
=========================================
Exercício 1 – Desenhando Formas no Canvas
=========================================

Desenhe:
- 10 quadrados;
- 10 linhas;
- 30 círculos.

Todas as formas podem possuir posições,
tamanhos e cores fixas.
*/

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

//raio do cir
var raio = 22;

//tamanho do quadrado
var tamquad = 100;

//quantidade de formas
var quantquad = 10;
var quantlinha = 10;
var quantcir = 30;

//espaco entre as formas
var espacoquad = 20;
var espacolinha = 90;
var espacocir = raio * 2; // dobro do tamanho do raio do círculo, pelo menos, para que não se sobreponham

// Retângulo
for (var i = 0; i < quantquad; i++) {
    c.fillStyle = 'rgb(0, 204, 255)';
    c.fillRect( (i *(tamquad + espacoquad )) + 80, 100, tamquad, tamquad); // x, y, largura, altura
}

// Linha
for(var i = 0; i < quantlinha; i++) {
    c.beginPath();
    c.moveTo((i * espacolinha) + 50, i + 500 ); // inicio da linha
    c.lineTo((i * espacolinha) + 300, i + 100); // fim da linha
    c.strokeStyle = 'rgba(236, 12, 206, 0.93)';
    c.stroke();
}

// Círculo
for(var i = 0; i < quantcir; i++) {
    c.beginPath();
    c.arc((i * espacocir) + 40, 400, raio, 0, Math.PI * 2, false); // x, y, raio, angulo inicial, angulo final, sentido anti-horário
    c.strokeStyle = 'rgba(245, 14, 14, 0.93)';
    c.stroke();
}