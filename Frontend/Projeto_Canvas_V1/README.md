<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:FFF700,50:FFC300,100:FF8C00&text=%20Canvas%20Game&fontColor=1A1A1A&fontSize=55&animation=fadeIn&fontAlignY=38&desc=Coleta%20de%20Pontos%20•%20HTML5%20Canvas%20•%20JavaScript&descAlignY=58"/>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3500&pause=1000&color=FF8C00&center=true&vCenter=true&width=700&lines=Mini+Game+feito+com+HTML+Canvas;Movimenta%C3%A7%C3%A3o+em+tempo+real;Sistema+de+Colis%C3%A3o+2D;JavaScript+Vanilla"/>
<br>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/Canvas-000000?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

</div>

---

# 📖 Sobre o Projeto

Neste jogo, o jogador controla um quadrado utilizando as setas do teclado com o objetivo de **coletar todos os pontos espalhados pelo mapa**.

Entretanto, existe um **núcleo central** que permanece em constante movimento, alterando o comportamento dos pontos ao seu redor e tornando a partida mais desafiadora.

Caso o jogador toque no núcleo, todo o progresso é perdido e a partida reinicia.

---

# 🎯 Objetivo

- 🎮 Controlar o jogador pelo cenário;
- ⭐ Coletar todos os **25 pontos**;
- ⚠️ Evitar o núcleo central;
- 🏆 Completar o jogo para vencer.

---

# 🕹️ Controles

| Tecla | Ação |
|-------|------|
| ⬆️ | Mover para cima |
| ⬇️ | Mover para baixo |
| ⬅️ | Mover para esquerda |
| ➡️ | Mover para direita |

---

# ⚙️ Mecânicas

## ⭐ Sistema de Coleta

- 25 pontos são gerados aleatoriamente pelo mapa;
- Ao tocar em um ponto, ele desaparece;
- Um contador acompanha o progresso da coleta.

---

## 🌌 Núcleo Central

O núcleo realiza um movimento contínuo com efeito de tremor.

Durante esse movimento, ele altera a posição dos pontos:

- 🧲 Atrai os pontos em determinadas direções;
- 💥 Repele os pontos quando muda seu sentido de movimento.

Essa dinâmica torna cada partida diferente.

---

## 💥 Colisão

Se o jogador tocar no núcleo:

- ❌ Retorna para a posição inicial;
- 🔄 Todos os pontos são recriados;
- 📉 O contador volta para zero.

---

# 🧠 Conceitos Trabalhados

O projeto utiliza diversos conceitos importantes de desenvolvimento com Canvas:

- Renderização utilizando **HTML Canvas**
- Loop de animação com `requestAnimationFrame()`
- Eventos de teclado (`keydown` e `keyup`)
- Movimentação em tempo real
- Geração de posições aleatórias
- Colisão 2D (AABB)
- Manipulação de vetores
- Atualização dinâmica da tela

---

# 🏆 Condição de Vitória

O jogo termina quando todos os pontos são coletados.

Ao concluir a partida, é exibida a mensagem:

```text
FIM DE JOGO
```

---

# 💻 Tecnologias

- HTML5
- HTML Canvas
- JavaScript (Vanilla JS)

---

# 📂 Estrutura do Projeto

```text
📁 Canvas-Game
│
├── index.html
├── canvas.js
└── README.md
```

---

# 🚀 Como Executar

1. Clone este repositório:

```bash
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
```

2. Entre na pasta do projeto.

3. Abra o arquivo **index.html** no navegador.

Não é necessário instalar dependências ou utilizar servidor.


---

# 📚 Aprendizados

Este projeto foi desenvolvido com o objetivo de praticar:

- Desenvolvimento de jogos 2D
- HTML Canvas
- JavaScript puro
- Manipulação do DOM
- Eventos do teclado
- Animações
- Colisão entre objetos
- Lógica de programação

---
<div align="center">

## ⭐ Obrigado por visitar este projeto!

Se este projeto foi útil ou interessante para você, considere deixar uma ⭐ no repositório.

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&section=footer&height=130&color=0:FFF700,50:FFC300,100:FF8C00"/>

</div>
