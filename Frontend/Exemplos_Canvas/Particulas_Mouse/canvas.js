//Redimensionar o canvas
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//Cores do quadrado
var vermelho;
var verde;
var azul;

var count = 0;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Rect (x,y,dx,dy,size, color) {

    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.size, this.size);
    }    

    this.update = function() {

        //Incrementando a posição em 1px
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        //Se o objeto atingir o limite horizontal positivo, altera sentido de movimento
        if(((this.x+80) >= canvas.width) || (this.x <= 0)) {
            this.dx = -this.dx;
        }

        if(((this.y+80) >= canvas.height) || (this.y <= 0)) {
            this.dy = - this.dy;
        }

        if((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {
            while (this.size < 15) this.size++;
            
        }

        if(this.size > 0) this.size -= 0.5;
        this.draw();
    }
}

var rectArray = [];
var colorArray = [
    '#F28A2E',
    '#F25C05',
    '#8C1C03',
    '#400601',
    '#0D0D0D',
];

console.log(colorArray.length);

function createObjects (){

    for(var j=0; j < 3000; j++) {   
        console.log((colorArray.lenght)-1);
        rectArray.push(new Rect(Math.random()*80, Math.random()*80, Math.random()*5, Math.random()*5,Math.random()*10, colorArray[Math.floor(Math.random()*(4))]));
        }
}

function animate () {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for(var a=0; a < rectArray.length; a++) {
        rectArray[a].update();
    }
}

createObjects();
animate();
