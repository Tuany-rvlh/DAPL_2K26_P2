var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

// Retângulo
c.fillStyle = 'rgb(0, 204, 255)';
c.fillRect(100, 100, 100, 100);

// Linha
c.beginPath();
c.moveTo(50, 500);
c.lineTo(300, 100);
c.strokeStyle = 'rgba(236, 12, 206, 0.93)';
c.stroke();

// Círculo
c.beginPath();
c.arc(400, 400, 60, 0, Math.PI * 2, false);
c.strokeStyle = 'rgba(245, 14, 14, 0.93)';
c.stroke();