var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var x = 200; // Posição Inicial
var dx = 4; //Velocidade do movimento

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0, 0, innerWidth, innerHeight); // Apaga toda a tela

    c.fillStyle = "#00ff73";
    c.fillRect(x, 200, 200, 200);

    //Se a borda do quadrado chegar ao limite, inverte a velocidade
    if((x + 200) > innerWidth){
        dx = -dx;
    }

    x = x+dx;

}

animate();