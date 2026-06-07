# 🎮 Canvas Game - Coleta de Pontos

Este projeto é um mini game desenvolvido em **JavaScript + HTML Canvas**, com foco em lógica de programação, manipulação do DOM e animações em tempo real.

---

## 📌 Descrição

O jogo consiste em um jogador controlado pelas setas do teclado que deve **coletar todos os pontos espalhados pela tela**.

Ao mesmo tempo, existe um “núcleo” central que se move com efeito de tremor e influencia o comportamento dos pontos.

---

## 🎯 Objetivo do Jogo

- Mover o jogador pelo mapa
- Coletar todos os **25 pontos amarelos**
- Evitar colisão com o núcleo central
- Completar o jogo para exibir a mensagem final

---

## 🕹️ Controles

- ⬆️ Seta para cima → move para cima  
- ⬇️ Seta para baixo → move para baixo  
- ⬅️ Seta para esquerda → move para esquerda  
- ➡️ Seta para direita → move para direita  

---

## ⚙️ Mecânicas

### 🎯 Coleta de pontos
- Existem **25 pontos aleatórios**
- Ao encostar em um ponto, ele é removido
- Um contador mostra o progresso (`coletados/25`)

---

### 🌌 Núcleo central
- Um círculo branco se move com efeito de “tremor”
- Os pontos são:
  - **atraídos** quando o núcleo vai para um lado
  - **repelidos** quando muda de direção

---

### 💥 Colisão com o núcleo
Se o jogador encostar no núcleo:
- O jogador volta para a posição inicial
- Os pontos são resetados
- O progresso volta para 0

---

## 🧠 Lógica do Projeto

O jogo funciona com:

- `canvas` para renderização
- `requestAnimationFrame` para animação contínua
- Eventos de teclado (`keydown` e `keyup`)
- Vetores de posição para jogador e pontos
- Colisão baseada em coordenadas (AABB)

---

## 🏁 Condição de Vitória

O jogo termina quando:

- Todos os **25 pontos são coletados**
- A mensagem **"FIM DE JOGO"** é exibida no centro da tela

---

## 💻 Tecnologias Utilizadas

- HTML Canvas
- JavaScript puro (Vanilla JS)
- Manipulação de eventos do DOM

---

## 📂 Estrutura do Projeto

- `canvas` → área do jogo
- `animate()` → loop principal do jogo
- `random()` → geração de posições aleatórias
- Sistema de colisão → jogador vs pontos e núcleo

---

## 📌 Observações

Projeto desenvolvido com foco em aprendizado de:

- Lógica de jogos
- Animações com Canvas
- Controle de eventos
- Colisão 2D simples
