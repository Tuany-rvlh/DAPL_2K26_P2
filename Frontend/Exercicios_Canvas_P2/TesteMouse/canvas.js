var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouseX = 0;
var mouseY = 0;

var x = 250;
var y = 150;

var raio = 15;

// Captura movimento do mouse
canvas.addEventListener("mousemove", function(event){

    const rect = canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;

});


function animate(){

    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);


    // Movimento suave até o mouse
    x += (mouseX - x) * 0.1;
    y += (mouseY - y) * 0.1;


    // Limites do canvas

    if(x - raio < 0){ // esquerda
        x = raio;
    }

    if(y - raio < 0){ // superior
        y = raio;
    }

    if(x + raio > canvas.width){ // direita
        x = canvas.width - raio;
    }

    if(y + raio > canvas.height){ // inferior
        y = canvas.height - raio;
    }


    // Desenha círculo
    c.beginPath();
    c.arc(x, y, raio, 0, Math.PI * 2);
    c.fillStyle = "#ff970f";
    c.fill();

}

animate();