var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var x = 50;
var y = 50;
var velocidade = 5;
var teclas = {};
var tamquad = 100;

// Captura quando uma tecla é pressionada
document.addEventListener("keydown", (event) => {
    teclas[event.key] = true;
});

// Captura quando uma tecla é solta
document.addEventListener("keyup", (event) => {
    teclas[event.key] = false;
});

function animate(){
    requestAnimationFrame(animate);

        // Limpa o canvas
    c.clearRect(0, 0, canvas.width, canvas.height);

    c.fillStyle = "#e6ff08"

    // Atualiza a posição de acordo com as teclas pressionadas
    if(teclas["ArrowUp"])   y-= velocidade;
    if(teclas["ArrowDown"])   y+= velocidade;
    if(teclas["ArrowLeft"])   x-= velocidade;
    if(teclas["ArrowRight"])   x+= velocidade;

    // Limites do canvas

    if(x < 0){ // lado esquerdo
        x = 0;
    }

    if(y < 0){ //superior
        y = 0;
    }

    if(x + tamquad > canvas.width){ // lado direito
        x = canvas.width - tamquad;
    }

    if(y + tamquad > canvas.height){ //inferior
        y = canvas.height - tamquad;
    }


    c.fillRect(x, y, tamquad, tamquad);
}

animate();