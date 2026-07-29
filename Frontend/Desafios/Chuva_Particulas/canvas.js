// Seleciona o canvas
var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// Posição do mouse
var mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

// Captura movimento do mouse
window.addEventListener("mousemove", function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

// Cores da chuva
var cores = [
    "#00eaff",
    "#008cff",
    "#8be9fd",
    "#00ffff"
];

// Vetor que guarda todas as gotas
var chuva = [];

// Movimento suave da nuvem
var tempo = 0;

// Objeto da gota
function Rain(x,y,tamanho,velocidade,cor){
    this.x = x;
    this.y = y;
    this.tamanho = tamanho;
    this.velocidade = velocidade;
    this.cor = cor;

    // Desenha a gota
    this.draw = function(){
        c.fillStyle = this.cor;
        c.fillRect(
            this.x,
            this.y,
            this.tamanho,
            this.tamanho * 3
        );
    }

    // Atualiza a posição da gota
    this.update = function(){
        // Faz a gota cair
        this.y += this.velocidade;
        // Quando sair da área da chuva,
        // volta para baixo da nuvem
        if(this.y > mouse.y + 350){
            this.x = mouse.x + (Math.random() * 180 - 90);
            this.y = mouse.y + 30;
        }
        this.draw();
    }
}

// Cria as gotas
for(var i = 0; i < 250; i++){
    chuva.push(
        new Rain(
            mouse.x,
            mouse.y,
            Math.random() * 3 + 2,
            Math.random() * 4 + 2,
            cores[Math.floor(Math.random() * cores.length)]
        )
    );
}

// Desenha a nuvem
function desenharNuvem(){
    // Pequeno movimento de balanço
    var balanco = Math.sin(tempo) * 7;

    // Sombra da nuvem
    c.fillStyle = "rgba(0,180,255,0.25)";

    c.beginPath();
    c.arc(mouse.x - 18 + balanco,mouse.y + 8, 20, 0, Math.PI * 2);
    c.arc(mouse.x + balanco, mouse.y, 27, 0, Math.PI * 2);
    c.arc(mouse.x + 22 + balanco, mouse.y + 8, 20, 0, Math.PI * 2);
    c.fill();

    // Nuvem branca
    c.fillStyle = "white";

    // Parte esquerda
    c.beginPath();
    c.arc(
        mouse.x - 18 + balanco,
        mouse.y,
        18,
        0,
        Math.PI * 2
    );

    c.fill();

    // Parte central maior
    c.beginPath();

    c.arc(
        mouse.x + balanco,
        mouse.y - 10,
        27,
        0,
        Math.PI * 2
    );
    c.fill();

    // Parte direita
    c.beginPath();

    c.arc(
        mouse.x + 22 + balanco,
        mouse.y,
        18,
        0,
        Math.PI * 2
    );
    c.fill();
}

// Atualiza posição inicial das gotas
function atualizarChuva(){
    for(var i = 0; i < chuva.length; i++){
        // Faz as gotas nascerem na nuvem
        if(chuva[i].x == 0 && chuva[i].y == 0){
            chuva[i].x = mouse.x;
            chuva[i].y = mouse.y + 30;
        }
        chuva[i].update();
    }
}

// Loop principal
function animate(){
    requestAnimationFrame(animate);
    // Atualiza tempo da animação da nuvem
    tempo += 0.05;
    // Fundo
    c.fillStyle = "#050816";
    c.fillRect(0,0,canvas.width,canvas.height);
    // Primeiro desenha a chuva
    atualizarChuva();
    // Depois desenha a nuvem por cima
    // para parecer que as gotas saem dela
    desenharNuvem();
}
animate();