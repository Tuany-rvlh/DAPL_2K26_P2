// Busca o elemento canvas criado no HTML
var canvas = document.querySelector("canvas");

// Cria o contexto 2D do canvas
var c = canvas.getContext("2d");

// Define o tamanho de cada bloco do jogo.
var tamanho = 15;

// Calcula quantos blocos cabem horizontalmente e verticalmente no canvas.
// Como o canvas tem 900x450:
// 900 / 15 = 60 colunas
// 450 / 15 = 30 linhas
var colunas = canvas.width / tamanho;
var linhas = canvas.height / tamanho;

// Define a velocidade inicial do jogo.
var velocidade = 120;

// Controla se o jogo está ativo.
var jogoRodando = true;

// Guarda todas as partes da cobra, cada posição possui:
// x → coluna onde o bloco está
// y → linha onde o bloco está
var cobra;

// Define a direção inicial da cobra(direita).
var direcao = "Right";

// Armazena a quantidade de frutas comidas.
var pontos = 0;

// Função responsável por criar ou reiniciar uma partida.
function iniciar(){

    // Cria a cobra inicialmente com três blocos.
    // O primeiro item do vetor sempre representa a cabeça.
    // Os próximos representam o corpo.
    cobra = [
        {x:10, y:10}, // cabeça
        {x:9, y:10},  // primeiro segmento
        {x:8, y:10}   // segundo segmento
    ];

    // Coloca a cobra novamente apontando para direita.
    direcao = "Right";

    // Zera a pontuação.
    pontos = 0;

    // Retorna a velocidade inicial.
    velocidade = 120;

    // Permite que o jogo rode novamente.
    jogoRodando = true;

    // Atualiza o texto mostrado no HTML.
    document.getElementById("placar").innerHTML = 
    "Pontos: 0";

    // Esconde o botão de reiniciar enquanto o jogo está acontecendo.
    document.getElementById("reiniciar").style.display = "none";

    // Gera uma nova posição para a fruta.
    gerarFruta();
}

// Cria um objeto vazio que receberá a posição da fruta.
var fruta = {};

// Captura qualquer tecla pressionada pelo jogador.
document.addEventListener("keydown", function(event){

    // Impede que a cobra faça um movimento impossível.
    // Exemplo:
    // Se ela está indo para cima, não pode imediatamente ir para baixo.

    if(event.key == "ArrowUp" && direcao != "Down"){
        direcao = "Up";
    }

    if(event.key == "ArrowDown" && direcao != "Up"){
        direcao = "Down";
    }

    if(event.key == "ArrowLeft" && direcao != "Right"){
        direcao = "Left";
    }

    if(event.key == "ArrowRight" && direcao != "Left"){
        direcao = "Right";
    }

});

// Cria uma nova posição para a fruta.
function gerarFruta(){
    // Escolhe uma coluna aleatória.
    fruta.x = Math.floor(Math.random() * colunas);

    // Escolhe uma linha aleatória.
    fruta.y = Math.floor(Math.random() * linhas);
}

// Atualiza a posição da cobra a cada ciclo do jogo.
function moverCobra(){

    // Cria uma cópia da posição atual da cabeça.
    // Essa será modificada para criar a nova posição.
    var cabeca = {
        x:cobra[0].x,
        y:cobra[0].y
    };

    // Altera a posição da cabeça conforme a direção atual.
    if(direcao == "Up"){
        cabeca.y--;
    }

    if(direcao == "Down"){
        cabeca.y++;
    }

    if(direcao == "Left"){
        cabeca.x--;
    }

    if(direcao == "Right"){
        cabeca.x++;
    }

    // Adiciona a nova cabeça no início do vetor.
    cobra.unshift(cabeca);

    // Verifica se a cabeça está na mesma posição da fruta.
    if(cabeca.x == fruta.x && cabeca.y == fruta.y){

        // Adiciona um ponto.
        pontos++;

        // Atualiza o placar no HTML.
        document.getElementById("placar").innerHTML =
        "Pontos: " + pontos;

        // Cria uma nova fruta.
        gerarFruta();

        // Aumenta a dificuldade.
        // Quanto mais pontos, mais rápido a cobra fica.
        if(velocidade > 40){
            velocidade -= 5;
        }
    }   else {
        // Caso não tenha comido fruta,
        // remove o último bloco.
        cobra.pop();
        }
}

// Função responsável por desenhar todos os elementos visuais do jogo.
function desenhar(){

    // Apaga todo o conteúdo anterior do canvas.
    c.clearRect( 0, 0, canvas.width, canvas.height);

    // Define a cor das linhas da grade.
    c.strokeStyle = "#222";

    // Cria as linhas verticais do tabuleiro.
    for(var x = 0; x < canvas.width; x += tamanho){
        c.beginPath();
        // Define o ponto inicial da linha.
        c.moveTo(x,0);
        // Define o ponto final da linha.
        c.lineTo(x,canvas.height);
        // Desenha a linha.
        c.stroke();
    }

    // Cria as linhas horizontais do tabuleiro.
    for(var y = 0; y < canvas.height; y += tamanho){
        c.beginPath();
        c.moveTo(0,y);
        c.lineTo(canvas.width,y);
        c.stroke();
    }

    // Inicia um novo desenho.
    // A fruta será desenhada como um círculo.
    c.beginPath();

    // O centro da fruta precisa estar no meio do bloco.
    c.arc(
        fruta.x * tamanho + tamanho / 2,
        fruta.y * tamanho + tamanho / 2,
        tamanho / 2,
        0,
        Math.PI * 2
    );

    // Define a cor da fruta.
    c.fillStyle = "red";
    // Preenche o círculo.
    c.fill();

    // Percorre todas as partes da cobra.
    // O índice 0 representa a cabeça.
    // Os demais índices representam o corpo.
    cobra.forEach(function(parte,index){

        // A cabeça recebe uma cor diferente
        // para facilitar a identificação.
        if(index == 0){
            c.fillStyle = "#00ff37";
        } else {
            c.fillStyle = "#008f2b";
        }

        // Desenha cada pedaço da cobra.
        // converte para pixels.
        c.fillRect(
            parte.x * tamanho,
            parte.y * tamanho,
            tamanho,
            tamanho
        );
    });

    // Define a cor dos olhos.
    c.fillStyle = "black";
    // Primeiro olho.
    c.fillRect(cobra[0].x * tamanho + 4, cobra[0].y * tamanho + 4, 3, 3 );
    // Segundo olho.
    c.fillRect(cobra[0].x * tamanho + 10, cobra[0].y * tamanho + 4, 3, 3);

}

// Verifica se a cobra bateu em algum obstáculo.
function verificarColisao(){

    // Guarda a posição atual da cabeça.
    // A cabeça é a única parte que pode causar colisão.
    var cabeca = cobra[0];

    // Verifica se a cabeça saiu dos limites do canvas.
    // x < 0 significa saiu pela esquerda;
    // x >= colunas significa saiu pela direita;
    // y < 0 significa saiu por cima;
    // y >= linhas significa saiu por baixo.
    if(
        cabeca.x < 0 ||
        cabeca.y < 0 ||
        cabeca.x >= colunas ||
        cabeca.y >= linhas
    ){
        gameOver();
    }


    // índice 0 é a própria cabeça.
    // A cabeça não pode colidir com ela mesma.
    for(var i = 1; i < cobra.length; i++){
        // Compara a posição da cabeça
        // com cada parte do corpo.
        if(
            cabeca.x == cobra[i].x &&
            cabeca.y == cobra[i].y
        ){
            gameOver();
        }
    }
}

// Função executada quando o jogador perde.
function gameOver(){
    // Impede que o jogo continue movimentando.
    jogoRodando = false;

    // Cria uma camada escura transparente
    // sobre o tabuleiro.
    c.fillStyle = "rgba(0,0,0,0.7)";
    c.fillRect(0,0,canvas.width, canvas.height);

    // Configura o texto de derrota.
    c.fillStyle = "white";
    c.font = "50px Arial";

    // Mostra a mensagem no centro.
    c.fillText(
        "GAME OVER",
        canvas.width / 2 - 150,
        canvas.height / 2
    );
    // Mostra o botão de reiniciar.
    document.getElementById("reiniciar").style.display = "inline";
}
// Quando o botão de reiniciar for clicado,
// chama novamente a função iniciar().
document.getElementById("reiniciar").onclick = function(){
    iniciar();
};

// Função principal do jogo.
function jogo(){
    // Só executa enquanto o jogador não perdeu.
    if(jogoRodando){
        moverCobra();
        verificarColisao();
        // Só desenha novamente se ainda estiver jogando.
        // Se perdeu, mantém a tela do Game Over.
        if(jogoRodando){
            desenhar();
        }
    }
    setTimeout(
        jogo,
        velocidade
    );
}

// Inicializa todas as variáveis.
iniciar();
// Começa o funcionamento do jogo.
jogo();