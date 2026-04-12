## 🧙 EDH Counter

**EDH Counter** é um life tracker *feature-rich* para Magic: The Gathering Commander (EDH), projetado para partidas reais na mesa.

☕ Apoie o projeto no Ko-fi: https://ko-fi.com/vdiorio

Suporta de 2 a 6 jogadores com layout dinâmico e orientação individual, garantindo que cada jogador veja suas informações corretamente do seu lado da mesa.

---

## ✨ Features

- Suporte para **2–6 jogadores**
- **Layout dinâmico** adaptado à mesa
- **Orientação individual** por jogador
- **Dano de comandante**
- Contadores:
  - Veneno
  - Energia
  - Experiência
- **Monarca** e **Iniciativa**
- **Proliferar** com um toque
- **Seletor de jogador inicial**
- 🔥 **Dano global**: aplique dano em todos os jogadores ao mesmo tempo  
  *(mais útil do que parece — especialmente em efeitos em massa)*

---

## 🎮 Funcionalidades

### ❤️ Totais de Vida
- Começa em 40. Toque para alterar em ±1 e segure para repetir em intervalos de 100ms.
- O rastreador de delta mostra alterações recentes (+5, -3...) com animação de fade-out que limpa automaticamente após 2 segundos e salva no histórico.
- Barra lateral rolável de histórico de vida com totais acumulados e ganhos/perdas coloridos.

### ⚔️ Dano de Comandante
- Rastreia separadamente o dano do comandante principal e do parceiro de cada oponente.
- **Alternância de vínculo (chain link)**: ao ativar, o dano de comandante reduz diretamente o total de vida; desativado, é rastreado de forma independente.
- Tela dedicada de CDMG em tela cheia com incrementadores duplos por oponente.

### ☣️ Contadores
- Contadores de **Veneno**, **Energia** e **Experiência** por jogador.
- **Proliferar**: um toque incrementa todos os contadores acima de zero em todos os jogadores.
- Pressione e segure para desfazer a última proliferação (repete a cada 400ms).

### 👑 Monarca e 🏰 Iniciativa
- Ative/desative por partida e toque para atribuir a um jogador.
- Monarca: barra dourada com coroa.
- Iniciativa: barra roxa com indicador de masmorra.
- Ambas com animações de entrada/saída.

### 💥 Dano em Todos
- Um botão causa **1 de dano em todos os outros jogadores**.
- Pressione e segure para repetir.
- Durante o hold, o comportamento muda para aplicar **+1 em todos**.
- Feedback visual com estrela rotativa animada.

### 🎲 Seletor de Jogador Inicial
- Roda animada percorre todos os jogadores antes de parar.

### 🧩 Layouts
12 configurações para 2 a 6 jogadores.  
Cada card gira automaticamente para ficar voltado ao jogador.

---

## 🧱 Stack Tecnológica

| Camada | Biblioteca |
|--------|------------|
| Framework | React Native 0.76 + Expo 52 |
| Roteamento | Expo Router 4 |
| Estado | Zustand 5 |
| Animações | Reanimated 3 |
| Gestos | Gesture Handler |
| Ícones | @expo/vector-icons |
| Motor JS | Hermes |
| Build | EAS Build |

---

## 🚀 Como Começar

```bash
npm install