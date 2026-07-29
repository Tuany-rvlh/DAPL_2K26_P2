/*
=============================
Exercício 4 – Raios Aleatórios
=============================

Mantendo as funcionalidades dos
exercícios anteriores, faça com que
cada círculo possua um raio aleatório
entre 10 e 40 pixels.
*/

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

//tamanho do quad
var tamquad = 80;

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

    // valor de x e y do quadrado (aleatório)
    var xquad = Math.random() * (canvas.width - tamquad);
    var yquad = Math.random() * (canvas.height - tamquad);

    // desenha o quadrado
    c.fillStyle = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
    )`;
    c.fillRect( xquad, yquad, tamquad, tamquad); // x, y, largura, altura
}

// Linha
for(var i = 0; i < quantlinha; i++) {

    //valor de x e y do inicio da linha (aleatório)
    var xlinha1 = Math.random() * canvas.width;
    var ylinha1 = Math.random() * canvas.height;

    // valor de x e y do fim da linha (aleatório)
    var xlinha2 = Math.random() * canvas.width;
    var ylinha2 = Math.random() * canvas.height;

    c.beginPath();
    c.moveTo( xlinha1, ylinha1); // inicio da linha
    c.lineTo( xlinha2, ylinha2); // fim da linha
    c.strokeStyle = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
    )`;
    c.stroke();
}

// Círculo
for(var i = 0; i < quantcir; i++) {

    // valor de x e y do centro do círculo (aleatório)
    var xcir = Math.random() * (canvas.width - raio * 2) + raio; // para que o círculo não ultrapasse a borda do canvas
    var ycir = Math.random() * (canvas.height - raio * 2) + raio;

    // valor do raio do círculo (aleatório)
    var raio = Math.random() * 30 + 10; // entre 10 e 40

    // desenha o círculo
    c.beginPath();
    c.arc( xcir, ycir, raio, 0, Math.PI * 2, false); // x, y, raio, angulo inicial, angulo final, sentido anti-horário
    c.strokeStyle = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
    )`;
    c.stroke();
}