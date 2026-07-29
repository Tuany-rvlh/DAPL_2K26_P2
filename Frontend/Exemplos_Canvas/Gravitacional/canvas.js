//Redimensionar o canvas
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//Cores do quadrado
var vermelho;
var verde;
var azul;


var quadradosVetor = [];
var coresVetor = [
    '#730217',
    '#40010D',
    '#BF54B8',
    '#C1D6D9',
    '#D9B7B0',
];

for(j=0;j<3000;j++) {

    //Criar um objeto do tipo Quadrado e armazenando no vetor
    quadradosVetor[j] = new Quadrado(Math.random()*100, Math.random()*100, Math.random()*20, coresVetor[Math.floor(Math.random()*5)], Math.random()*10, Math.random()*10);
}

console.log(quadradosVetor);

function Quadrado (posX, posY, tamanho, cor, velX, velY) {

    this.posX = posX;
    this.posY = posY;
    this.tamanho = tamanho;
    this.cor = cor;
    this.velX = velX;
    this.velY = velY;

    this.desenhar = function () {
        c.fillStyle = this.cor;
        c.fillRect(this.posX , this.posY, this.tamanho, this.tamanho);
    }

    this.movimentar = function () {
        //Incrementando a posição em 1px
        this.posX = this.posX + this.velX;

        //Se o objeto atingir o limite horizontal positivo, altera sentido de movimento
        if(((this.posX+this.tamanho) >= window.innerWidth) || (this.posX <= 0)) {
            this.velX = -this.velX;
            colision();
        }

        this.posY = this.posY + this.velY;

        if(((this.posY+this.tamanho) >= window.innerHeight) || (this.posY <= 0)) {
            this.velY = -this.velY;
            colision();
        }
    }
}

function animate () {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(b=0;b<quadradosVetor.length;b++) {
        quadradosVetor[b].desenhar();
        quadradosVetor[b].movimentar();
    }
}

function colision (){
        
    vermelho = Math.random()*255;
    verde = Math.random()*255;
    azul = Math.random()*255;
}

animate();
