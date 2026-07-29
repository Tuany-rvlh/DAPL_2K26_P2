const http = require('http');

const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caçadores de Elétrons — Lei de Coulomb</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #05010f; overflow: hidden; font-family: 'Segoe UI', Arial, sans-serif; }
        canvas { display: block; }

        .overlay {
            position: fixed; inset: 0;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            background: rgba(5, 1, 15, 0.92);
            color: #fff; text-align: center; z-index: 10;
        }
        .overlay h1 { font-size: 48px; color: #ffde3b; text-shadow: 0 0 25px #ffde3b; margin-bottom: 10px; }
        .overlay p  { max-width: 620px; line-height: 1.5; margin-bottom: 18px; color: #cfd3ff; font-size: 16px; }
        .overlay .formula { font-size: 24px; color: #6df2ff; text-shadow: 0 0 15px #6df2ff; margin-bottom: 20px; }

        .secao-config {
            display: flex; gap: 20px; margin-bottom: 20px; align-items: center;
        }
        .secao-config select {
            padding: 8px 14px; font-size: 16px; border-radius: 8px;
            background: #120a2a; color: #6df2ff; border: 1px solid #6df2ff;
            cursor: pointer; outline: none;
        }

        button {
            font-size: 18px; padding: 10px 28px; margin: 6px;
            border: 2px solid #d805fe; border-radius: 12px;
            background: transparent; color: #f582ff; cursor: pointer;
            transition: all .2s;
        }
        button:hover { background: #d805fe; color: #fff; box-shadow: 0 0 25px #d805fe; }

        #btnReset {
            position: fixed; top: 14px; left: 50%; transform: translateX(-50%);
            font-size: 14px; padding: 6px 18px; z-index: 5; display: none;
            border-color: #6df2ff; color: #6df2ff; background: rgba(5, 1, 15, 0.7);
        }
        #btnReset:hover { background: #6df2ff; color: #05010f; box-shadow: 0 0 20px #6df2ff; }
    </style>
</head>
<body>

<canvas id="jogo"></canvas>
<button id="btnReset" onclick="voltarAoMenu()">↺ Menu Principal</button>

<div class="overlay" id="menu">
    <h1>⚡ Caçadores de Elétrons</h1>
    <p class="formula">F = k · q₁ · q₂ / r²</p>
    <p>
        Use a atração e a repulsão para capturar os elétrons ⚡ antes que o tempo acabe!<br>
        <b>Atenção:</b> Cuidado com as partículas expelidas pelo núcleo e evite encostar nele para não perder vidas!
    </p>

    <div class="secao-config">
        <label for="dificuldade" style="color: #6df2ff; font-weight: bold;">Dificuldade:</label>
        <select id="dificuldade">
            <option value="facil">Fácil (Sem tiros)</option>
            <option value="medio" selected>Médio (Com projéteis)</option>
            <option value="dificil">Difícil (Tiros rápidos + caos)</option>
        </select>
    </div>

    <div>
        <button onclick="iniciar(1)">🎮 1 Jogador</button>
        <button onclick="iniciar(2)">🎮🎮 2 Jogadores</button>
    </div>
    <p style="margin-top:15px; font-size:14px; color:#8890c9;">
        P1: Setas do teclado &nbsp;|&nbsp; P2: W A S D
    </p>
</div>

<div class="overlay" id="fim" style="display:none;">
    <h1 id="fimTitulo"></h1>
    <p id="fimTexto"></p>
    <button onclick="voltarAoMenu()">↺ Jogar de novo</button>
</div>

<script>
// ============================================================
//  CONFIGURAÇÃO BÁSICA E CANVAS
// ============================================================
const canvas = document.getElementById('jogo');
const c = canvas.getContext('2d');

function ajustarTela() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    nucleo.x = canvas.width / 2;
    nucleo.y = canvas.height / 2;
    criarEstrelas();
}

// ============================================================
//  CONSTANTES E ESTADO DO JOGO
// ============================================================
const K = 14000;            
const TOTAL_ELETRONS = 20;  
const ESPACO_CAUDA = 5;     

let jogoAtivo = false;
let players = [];
let eletrons = [];
let estrelas = [];
let projeis = [];
let mensagem = '';
let mensagemTimer = 0;

let tempoRestante = 60;
let timerInterval = null;
let frequenciaTiro = 120;
let taxaCarga = 300;      

const nucleo = {
    x: 0, y: 0,
    raio: 42,
    carga: 1,
    timer: 0,
    tiroTimer: 0,
    pulso: 0
};

// ============================================================
//  TECLADO
// ============================================================
const teclas = {};
document.addEventListener('keydown', (e) => {
    teclas[e.key.toLowerCase()] = true;
    if (['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase()))
        e.preventDefault();
});
document.addEventListener('keyup', (e) => teclas[e.key.toLowerCase()] = false);

// ============================================================
//  FUNÇÕES AUXILIARES
// ============================================================
function random(min, max) { return Math.random() * (max - min) + min; }
function distancia(x1, y1, x2, y2) { return Math.hypot(x2 - x1, y2 - y1); }

function forcaCoulomb(q1, q2, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const r2 = Math.max(dx * dx + dy * dy, 900);
    const r = Math.sqrt(r2);
    const f = (K * q1 * q2) / r2;
    return { fx: f * (dx / r), fy: f * (dy / r) };
}

function avisar(texto) {
    mensagem = texto;
    mensagemTimer = 150;
}

// ============================================================
//  CRIAÇÃO DOS ELEMENTOS
// ============================================================
function criarEstrelas() {
    estrelas = [];
    for (let i = 0; i < 130; i++) {
        estrelas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: random(0.3, 1.8),
            a: Math.random() * Math.PI * 2
        });
    }
}

function criarPlayer(nome, cor, corCauda, controles, x, y) {
    return {
        nome, cor, corCauda, controles,
        x, y, vx: 0, vy: 0,
        xInicial: x, yInicial: y,
        raio: 15,
        carga: 1,
        pontos: 0,
        vidas: 3,
        historico: []
    };
}

function criarEletrons() {
    eletrons = [];
    for (let i = 0; i < TOTAL_ELETRONS; i++) {
        let ex, ey;
        do {
            ex = random(40, canvas.width - 40);
            ey = random(40, canvas.height - 40);
        } while (distancia(ex, ey, nucleo.x, nucleo.y) < 160);
        eletrons.push({ x: ex, y: ey, vx: 0, vy: 0, raio: 7, carga: -1 });
    }
}

// ============================================================
//  INICIAR / REINICIAR / FIM
// ============================================================
function aplicarDificuldade() {
    const dif = document.getElementById('dificuldade').value;
    if (dif === 'facil') {
        frequenciaTiro = 0;
        taxaCarga = 360;
    } else if (dif === 'medio') {
        frequenciaTiro = 130;
        taxaCarga = 260;
    } else if (dif === 'dificil') {
        frequenciaTiro = 65;
        taxaCarga = 180;
    }
}

function iniciar(modo) {
    aplicarDificuldade();

    document.getElementById('menu').style.display = 'none';
    document.getElementById('fim').style.display = 'none';
    document.getElementById('btnReset').style.display = 'block';

    players = [criarPlayer('P1', '#d805fe', '#ff9df5',
        { cima: 'arrowup', baixo: 'arrowdown', esq: 'arrowleft', dir: 'arrowright' },
        80, 100)];

    if (modo === 2) {
        players.push(criarPlayer('P2', '#2fff8f', '#a9ffd4',
            { cima: 'w', baixo: 's', esq: 'a', dir: 'd' },
            canvas.width - 100, canvas.height - 120));
    }

    projeis = [];
    nucleo.carga = 1;
    nucleo.timer = 0;
    nucleo.tiroTimer = 0;
    tempoRestante = 60;

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (jogoAtivo) {
            tempoRestante--;
            if (tempoRestante <= 0) fimDeJogo('tempo');
        }
    }, 1000);

    criarEletrons();
    avisar('Capture o máximo de elétrons e sobreviva!');
    jogoAtivo = true;
}

function voltarAoMenu() {
    jogoAtivo = false;
    if (timerInterval) clearInterval(timerInterval);
    document.getElementById('fim').style.display = 'none';
    document.getElementById('btnReset').style.display = 'none';
    document.getElementById('menu').style.display = 'flex';
}

function fimDeJogo(motivo) {
    jogoAtivo = false;
    if (timerInterval) clearInterval(timerInterval);

    const fim = document.getElementById('fim');
    const titulo = document.getElementById('fimTitulo');
    const texto = document.getElementById('fimTexto');

    if (motivo === 'sem_vidas') {
        titulo.textContent = '💥 GAME OVER';
        texto.textContent = 'Suas vidas acabaram devido aos choques e projéteis do núcleo!';
    } else if (motivo === 'tempo') {
        titulo.textContent = '⏰ TEMPO ESGOTADO!';
        texto.textContent = \`O tempo acabou! Pontuação total: \${players.map(p => \`\${p.nome}: \${p.pontos}\`).join(' | ')}\`;
    } else {
        titulo.textContent = '🏆 TODOS OS ELÉTRONS CAPTURADOS!';
        texto.textContent = \`Parabéns! Pontuação: \${players.map(p => \`\${p.nome}: \${p.pontos}\`).join(' | ')}\`;
    }
    fim.style.display = 'flex';
}

// ============================================================
//  FÍSICA E ATUALIZAÇÕES
// ============================================================
function dispararProjetil() {
    if (players.length === 0) return;
    const pAlvo = players[Math.floor(Math.random() * players.length)];
    const angulo = Math.atan2(pAlvo.y - nucleo.y, pAlvo.x - nucleo.x);
    const vel = 3.5;

    projeis.push({
        x: nucleo.x, y: nucleo.y,
        vx: Math.cos(angulo) * vel,
        vy: Math.sin(angulo) * vel,
        raio: 6
    });
}

function atualizarNucleo() {
    nucleo.timer++;
    nucleo.pulso += 0.07;

    if (nucleo.timer >= taxaCarga) {
        nucleo.timer = 0;
        nucleo.carga *= -1;
        avisar(nucleo.carga > 0 ? 'Núcleo POSITIVO (+): Elétrons atraídos!' : 'Núcleo NEGATIVO (−): Elétrons repelidos!');
    }

    if (frequenciaTiro > 0) {
        nucleo.tiroTimer++;
        if (nucleo.tiroTimer >= frequenciaTiro) {
            nucleo.tiroTimer = 0;
            dispararProjetil();
        }
    }
}

function atualizarProjeis() {
    for (let i = projeis.length - 1; i >= 0; i--) {
        const proj = projeis[i];
        proj.x += proj.vx;
        proj.y += proj.vy;

        for (const p of players) {
            if (p.vidas > 0 && distancia(proj.x, proj.y, p.x, p.y) < p.raio + proj.raio) {
                p.vidas--;
                projeis.splice(i, 1);
                avisar(\`💥 \${p.nome} foi atingido por um projétil! (-1 Vida)\`);
                if (p.vidas <= 0 && players.every(pl => pl.vidas <= 0)) fimDeJogo('sem_vidas');
                break;
            }
        }

        if (proj && (proj.x < 0 || proj.x > canvas.width || proj.y < 0 || proj.y > canvas.height)) {
            projeis.splice(i, 1);
        }
    }
}

function atualizarEletrons() {
    for (const e of eletrons) {
        const fn = forcaCoulomb(nucleo.carga, e.carga, nucleo.x, nucleo.y, e.x, e.y);
        e.vx += fn.fx;
        e.vy += fn.fy;

        for (const p of players) {
            if (p.vidas > 0) {
                const fp = forcaCoulomb(p.carga * 0.25, e.carga, p.x, p.y, e.x, e.y);
                e.vx += fp.fx;
                e.vy += fp.fy;
            }
        }

        e.vx *= 0.975;
        e.vy *= 0.975;
        e.x += e.vx;
        e.y += e.vy;

        if (e.x < e.raio) { e.x = e.raio; e.vx *= -0.8; }
        if (e.x > canvas.width - e.raio) { e.x = canvas.width - e.raio; e.vx *= -0.8; }
        if (e.y < e.raio) { e.y = e.raio; e.vy *= -0.8; }
        if (e.y > canvas.height - e.raio) { e.y = canvas.height - e.raio; e.vy *= -0.8; }
    }
}

function aplicarDanoChoque(p) {
    p.vidas--;
    p.x = p.xInicial;
    p.y = p.yInicial;
    p.vx = p.vy = 0;
    p.historico = [];

    if (p.vidas <= 0 && players.every(pl => pl.vidas <= 0)) {
        fimDeJogo('sem_vidas');
    } else {
        avisar(\`⚡ \${p.nome} sofreu um choque do núcleo! (-1 Vida)\`);
    }
}

function atualizarPlayers() {
    for (const p of players) {
        if (p.vidas <= 0) continue;

        const acel = 0.55;
        if (teclas[p.controles.cima])  p.vy -= acel;
        if (teclas[p.controles.baixo]) p.vy += acel;
        if (teclas[p.controles.esq])   p.vx -= acel;
        if (teclas[p.controles.dir])   p.vx += acel;

        const fn = forcaCoulomb(nucleo.carga, p.carga, nucleo.x, nucleo.y, p.x, p.y);
        p.vx += fn.fx * 0.6;
        p.vy += fn.fy * 0.6;

        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx;
        p.y += p.vy;

        p.x = Math.max(p.raio, Math.min(canvas.width - p.raio, p.x));
        p.y = Math.max(p.raio, Math.min(canvas.height - p.raio, p.y));

        p.historico.unshift({ x: p.x, y: p.y });
        const tamanhoMax = (p.pontos + 2) * ESPACO_CAUDA;
        if (p.historico.length > tamanhoMax) p.historico.length = tamanhoMax;

        if (distancia(p.x, p.y, nucleo.x, nucleo.y) < p.raio + nucleo.raio) {
            aplicarDanoChoque(p);
        }

        for (let i = eletrons.length - 1; i >= 0; i--) {
            const e = eletrons[i];
            if (distancia(p.x, p.y, e.x, e.y) < p.raio + e.raio + 4) {
                eletrons.splice(i, 1);
                p.pontos++;
            }
        }
    }

    if (eletrons.length === 0) fimDeJogo('vitoria');
}

// ============================================================
//  DESENHO DA TELA
// ============================================================
function desenharFundo() {
    const grad = c.createRadialGradient(nucleo.x, nucleo.y, 60, nucleo.x, nucleo.y, canvas.width * 0.8);
    grad.addColorStop(0, nucleo.carga > 0 ? '#1c0620' : '#061024');
    grad.addColorStop(1, '#05010f');
    c.fillStyle = grad;
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (const s of estrelas) {
        s.a += 0.03;
        c.globalAlpha = 0.4 + Math.sin(s.a) * 0.3;
        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fill();
    }
    c.globalAlpha = 1;
}

function desenharNucleo() {
    const raio = nucleo.raio + Math.sin(nucleo.pulso) * 5;
    const cor = nucleo.carga > 0 ? '#ff5b5b' : '#6da8ff';

    c.shadowColor = cor;
    c.shadowBlur = 45;
    c.fillStyle = cor;
    c.beginPath();
    c.arc(nucleo.x, nucleo.y, raio, 0, Math.PI * 2);
    c.fill();
    c.shadowBlur = 0;

    c.fillStyle = '#ffffff';
    c.font = 'bold 46px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(nucleo.carga > 0 ? '+' : '−', nucleo.x, nucleo.y + 2);

    const prog = 1 - nucleo.timer / taxaCarga;
    c.strokeStyle = cor;
    c.lineWidth = 3;
    c.beginPath();
    c.arc(nucleo.x, nucleo.y, raio + 12, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
    c.stroke();
}

function desenharProjeis() {
    for (const p of projeis) {
        c.shadowColor = '#ff3366';
        c.shadowBlur = 12;
        c.fillStyle = '#ff3366';
        c.beginPath();
        c.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0;
    }
}

function desenharEletrons() {
    for (const e of eletrons) {
        c.shadowColor = '#ffde3b';
        c.shadowBlur = 14;
        c.fillStyle = '#ffde3b';
        c.beginPath();
        c.arc(e.x, e.y, e.raio, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0;

        c.fillStyle = '#5a4a00';
        c.font = 'bold 11px Arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText('−', e.x, e.y + 1);
    }
}

function desenharPlayers() {
    for (const p of players) {
        if (p.vidas <= 0) continue;

        for (let i = p.pontos - 1; i >= 0; i--) {
            const idx = (i + 1) * ESPACO_CAUDA;
            const pos = p.historico[Math.min(idx, p.historico.length - 1)];
            if (!pos) continue;
            c.globalAlpha = 0.85;
            c.fillStyle = p.corCauda;
            c.beginPath();
            c.arc(pos.x, pos.y, 9, 0, Math.PI * 2);
            c.fill();
        }
        c.globalAlpha = 1;

        c.shadowColor = p.cor;
        c.shadowBlur = 25;
        c.fillStyle = p.cor;
        c.beginPath();
        c.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
        c.fill();
        c.shadowBlur = 0;

        c.fillStyle = '#ffffff';
        c.font = 'bold 20px Arial';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText('+', p.x, p.y + 1);
    }
}

function desenharHUD() {
    c.textBaseline = 'alphabetic';

    // HUD P1
    c.font = 'bold 22px Arial';
    c.textAlign = 'left';
    c.fillStyle = players[0].cor;
    const vidasP1 = '❤️'.repeat(Math.max(0, players[0].vidas));
    c.fillText(\`P1 ⚡ \${players[0].pontos}  Vidas: \${vidasP1}\`, 20, 42);

    // HUD P2
    if (players[1]) {
        c.textAlign = 'right';
        c.fillStyle = players[1].cor;
        const vidasP2 = '❤️'.repeat(Math.max(0, players[1].vidas));
        c.fillText(\`P2 ⚡ \${players[1].pontos}  Vidas: \${vidasP2}\`, canvas.width - 20, 42);
    }

    // Temporizador
    c.textAlign = 'center';
    c.font = 'bold 28px Arial';
    c.fillStyle = tempoRestante <= 10 ? '#ff4d4d' : '#6df2ff';
    c.fillText(\`⏱️ \${tempoRestante}s\`, canvas.width / 2, 45);

    // Status elétrons
    c.fillStyle = '#8890c9';
    c.font = '16px Arial';
    c.fillText(\`Elétrons livres: \${eletrons.length}\`, canvas.width / 2, canvas.height - 40);

    // Fórmula
    c.fillStyle = '#6df2ff';
    c.font = 'bold 18px Arial';
    c.fillText('F = k · q₁ · q₂ / r²', canvas.width / 2, canvas.height - 15);

    // Mensagens de Alerta
    if (mensagemTimer > 0) {
        mensagemTimer--;
        c.globalAlpha = Math.min(1, mensagemTimer / 40);
        c.fillStyle = '#ffffff';
        c.font = 'bold 20px Arial';
        c.fillText(mensagem, canvas.width / 2, 85);
        c.globalAlpha = 1;
    }
}

// ============================================================
//  LOOP PRINCIPAL
// ============================================================
function animar() {
    requestAnimationFrame(animar);

    desenharFundo();

    if (!jogoAtivo) {
        nucleo.pulso += 0.05;
        desenharNucleo();
        return;
    }

    atualizarNucleo();
    atualizarProjeis();
    atualizarEletrons();
    atualizarPlayers();

    desenharNucleo();
    desenharProjeis();
    desenharEletrons();
    desenharPlayers();
    desenharHUD();
}

ajustarTela();
window.addEventListener('resize', ajustarTela);
animar();
</script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(html);
});

const port = 3000;

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});