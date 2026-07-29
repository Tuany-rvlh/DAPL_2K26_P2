<div align="center">

<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&height=220&color=0:d805fe,50:6df2ff,100:05010f&text=%20Ca%C3%A7adores%20de%20El%C3%A9trons&fontColor=ffffff&fontSize=48&animation=fadeIn&fontAlignY=38&desc=F%C3%ADsica%20•%20HTML5%20Canvas%20•%20JavaScript&descAlignY=58"/>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&duration=3500&pause=1000&color=6DF2FF&center=true&vCenter=true&width=700&lines=Jogo+Educativo+sobre+a+Lei+de+Coulomb;Modo+1+ou+2+Jogadores+(Local);Sistema+de+Vidas%2C+Tempo+e+Dificuldade;Simula%C3%A7%C3%A3o+F%C3%ADsica+em+JavaScript+Vanilla"/>
<br>

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/Canvas-000000?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

</div>

---

# 📖 Sobre o Projeto

**Caçadores de Elétrons** é um jogo interativo 2D desenvolvido com HTML5 Canvas e JavaScript puro que utiliza conceitos da **Física de Eletrostática** como mecânica principal.

O jogador assume o papel de uma **carga elétrica positiva (+)** e precisa utilizar as forças eletrostáticas de **atração e repulsão** para capturar elétrons soltos pelo mapa, enquanto se esquiva dos perigos gerados pelo **núcleo central**, que varia periodicamente de carga e dispara projéteis energéticos.

---

# 🎯 Objetivo

- ⚡ Capturar o maior número possível de elétrons ($q = -1$);
- ⏱️ Completar o objetivo antes que o tempo limite de **60 segundos** se esgoste;
- ❤️ Preservar suas **3 vidas**, evitando choques com o núcleo central e se esquivando de projéteis;
- 🎮 Competir ou cooperar no modo **1 Jogador** ou **2 Jogadores (Local)**.

---

# 🕹️ Controles

| Jogador | Mover para Cima | Mover para Baixo | Esquerda | Direita |
| :---: | :---: | :---: | :---: | :---: |
| **P1** (Rosa 🟣) | ⬆️ Seta Cima | ⬇️ Seta Baixo | ⬅️ Seta Esquerda | ➡️ Seta Direita |
| **P2** (Verde 🟢) | <kbd>W</kbd> | <kbd>S</kbd> | <kbd>A</kbd> | <kbd>D</kbd> |

---

# ⚙️ Mecânicas & Física do Jogo

## 🧲 A Lei de Coulomb
A força ($F$) aplicada sobre os elétrons e jogadores é calculada dinamicamente utilizando a fórmula:

$$F = k \cdot \frac{q_1 \cdot q_2}{r^2}$$

- **Cargas opostas se atraem ($F < 0$):** Quando o núcleo é positivo ($+$), ele atrai os elétrons.
- **Cargas iguais se repelem ($F > 0$):** Quando o núcleo muda para negativo ($-$), ele repele os elétrons para as bordas.

---

## 🌌 Núcleo Central Dinâmico

- Alterna sua carga eletrostática em intervalos regulares.
- Expulsa **projéteis elétricos** na direção dos jogadores (dependendo do nível de dificuldade).
- Ao encostar no núcleo, o jogador sofre um choque elétrico e perde **1 vida**.

---

## 🎚️ Níveis de Dificuldade

| Nível | Descrição |
| :--- | :--- |
| **🟢 Fácil** | Sem disparo de projéteis e troca de carga do núcleo mais lenta. |
| **🟡 Médio** | Disparo de projéteis moderado e dinâmica padrão de atração/repulsão. |
| **🔴 Difícil** | Disparos frequentes e troca rápida de carga do núcleo (caos total!). |

---

# 🧠 Conceitos Trabalhados

- **Física Eletrostática:** Atração, repulsão, cargas elétricas e Lei de Coulomb.
- **HTML Canvas 2D:** Renderização, sistemas de partículas e iluminação/brilho (*glowing effects*).
- **Vetores e Matemática:** Trigonometria (`Math.atan2`, `Math.hypot`), distância euclidiana e vetores de força.
- **Mecânicas de Jogos:** Temporizador regressivo, controle de vidas, suporte a multiplayer local e inteligência de disparos.

---

# 💻 Tecnologias

- **HTML5**
- **CSS3**
- **JavaScript Vanilla (ES6+)**
- **HTML5 Canvas API**

---

# 📂 Estrutura do Projeto

```text
📁 Cacadores-de-Eletrons
│
├── joguinho.html   # Estrutura HTML, estilização CSS e overlays/menus
├── jogo.js         # Lógica da física, renderização do canvas e mecânicas
└── README.md       # Documentação do projeto