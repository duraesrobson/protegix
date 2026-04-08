# Protegix - Segurança Digital 🔒

<p align="center">
  <img src="src/assets/protegix-logo-sec.svg" alt="Protegix Banner" width="80%">
</p>

<p align="center">
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://mui.com/"><img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="Material-UI"></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="https://ai.google.dev/"><img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini"></a>
  <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
</p>

Plataforma educativa completa desenvolvida com foco em conscientização e educação sobre **segurança digital**. Oferece visualização de dados em tempo real via Google Forms, quiz interativo com leaderboard gamificado e conteúdo educativo detalhado.

---

## Funcionalidades

### Dashboard de Dados

- **Gráficos Interativos**: Exibe respostas do Google Forms em múltiplos formatos (barras, pizza, linhas)
- **Atualização em Tempo Real**: Sincronização dinâmica com Google Sheets + Firebase
- **Análise Automática**: Insights IA gerados com Google Gemini
- **Métricas Educacionais**: Análises cruzadas do conhecimento dos usuários
- **Design Acessível**: Interface responsiva com Material-UI

### Quiz Interativo com Leaderboard

- **30 Perguntas**: Banco abrangente sobre segurança digital em diferentes níveis de dificuldade
- **10 Perguntas Aleatórias**: Seleção aleatória a cada tentativa para evitar decoreba
- **Feedback Imediato**: Visual claro de acertos (verde) e erros (vermelho)
- **Explicações Detalhadas**: Justificativas pedagógicas após cada resposta
- **Pontuação Dinâmica**: Cálculo de score e taxa de acerto em tempo real
- **Leaderboard Opcional**: Ranking gamificado com salvamento em Firebase
  - Permite participação voluntária dos usuários
  - Classifica por pontuação e data
  - Exibe top 10 com nome, pontuação e percentual de acerto
  - Tabela colapsável para economizar espaço

### Página Educativa "Aprenda"

- **Conteúdo Estruturado**: Seções bem organizadas (conceitos, ameaças, ações)
- **Cards Educacionais**: Informações sobre senhas, phishing, privacidade e mais
- **Dicas Práticas**: 6+ dicas detalhadas com boas práticas aplicáveis
- **Ameaças Comuns**: Lista completa de riscos digitais
- **Design Pedagógico**: Interface intuitiva e responsiva para todos os públicos

---

## Tecnologias Utilizadas

### Frontend

- **React 19** - Framework JavaScript moderno com suporte a Server Components
- **TypeScript** - Tipagem estática para maior segurança e manutenibilidade
- **Vite** - Build tool ultrarrápido com HMR
- **Material-UI (MUI) v7** - Sistema de componentes design moderno
- **React Router v7** - Navegação SPA com roteamento dinâmico
- **Sass/SCSS** - Estilização modular com CSS Modules

### Backend & Dados

- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Firebase Authentication** - Gestão de autenticação (se necessário)
- **Google Forms + Google Sheets** - Coleta estruturada de dados
- **Google Generative AI (Gemini)** - Análise automática com IA
- **Axios** - Cliente HTTP para requisições

### Desenvolvimento & Qualidade

- **ESLint** - Linting e qualidade de código
- **TypeScript ESLint** - Regras avançadas para TypeScript
- **Vercel** - Deploy automático e hospedagem

### Bibliotecas Adicionais

- **MUI X Charts** - Gráficos profissionais (Bar, Pie, Line)
- **MUI X Data Grid** - Tabelas avançadas (para leaderboard)
- **Emotion** - CSS-in-JS para Material-UI
- **React Icons** - Ícones SVG para interface
- **date-fns** - Manipulação de datas
- **tsx** - Execução de TypeScript em Node.js

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── charts/              # Componentes de visualização
│   │   ├── BarChartCard.tsx
│   │   ├── LineChartCard.tsx
│   │   ├── PieChartCard.tsx
│   │   ├── PiePaddingChartCard.tsx
│   │   ├── FeedbackListCard.tsx
│   │   └── ChartStyles.module.scss
│   ├── home/                # Seções da página inicial
│   │   ├── HeroSection.tsx
│   │   └── dashboard/
│   ├── layout/              # Estrutura geral
│   │   ├── AppLayout.tsx
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── *.css
│   ├── learn/               # Componentes educacionais
│   │   ├── SecurityCard.tsx
│   │   ├── SecurityTips.tsx
│   │   ├── SecurityThreats.tsx
│   │   └── SecurityActions.tsx
│   ├── quiz/                # Sistema de quiz
│   │   ├── Quiz.tsx         # Componente principal do quiz
│   │   ├── Leaderboard.tsx  # Ranking gamificado
│   │   └── Quiz.module.scss
│   └── ui/                  # Componentes reutilizáveis
│       ├── AppButton.tsx
│       └── NavItem.tsx
├── data/
│   └── quiz.ts              # 30 perguntas de segurança digital
├── hooks/
│   ├── useTotalResponses.ts # Hook para análise de respostas
│   └── useLeaderboard.ts    # Hook para gerenciar leaderboard
├── lib/
│   └── firebase.ts          # Configuração do Firebase
├── pages/
│   ├── Home.tsx             # Dashboard principal
│   ├── QuizPage.tsx         # Página do quiz + leaderboard
│   ├── dashboard/
│   └── learn/               # Página educativa
├── styles/
│   ├── index.css            # Estilos globais
│   └── theme.css            # Variáveis de tema
├── theme/
│   └── muiTheme.ts          # Configuração Material-UI
├── types/
│   └── quiz.ts              # Definições TypeScript
├── utils/
│   ├── generateChartInsight.tsx    # Análise IA de gráficos
│   ├── getThemeColor.ts     # Utilitários de tema
│   └── ChartInsight.module.scss
├── App.tsx                  # Componente root
└── main.tsx                 # Entry point
```

---

## Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Firebase com Firestore configurado
- (Opcional) Conta Google para Forms/Sheets integração

### Instalação & Setup

1. **Clone o repositório**

   ```bash
   git clone https://github.com/duraesrobson/protegix.git
   cd protegix-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase** (`src/lib/firebase.ts`)

   ```typescript
   import { initializeApp } from "firebase/app"
   import { getFirestore } from "firebase/firestore"

   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   }

   export const app = initializeApp(firebaseConfig)
   export const db = getFirestore(app)
   ```

4. **Configure Google Sheets (opcional)**
   - Crie um formulário Google Forms
   - Conecte a uma planilha Google Sheets
   - Configure os Apps Scripts conforme necessário

5. **Execute o projeto**

   ```bash
   npm run dev
   ```

   A aplicação rodará em `http://localhost:5173`

6. **Build para Produção**

   ```bash
   npm run build      # Compila TypeScript e Vite
   npm run preview    # Visualiza o build localmente
   ```

---

## Scripts Disponíveis

| Script                     | Descrição                                    |
| -------------------------- | -------------------------------------------- |
| `npm run dev`              | Inicia servidor de desenvolvimento com HMR   |
| `npm run build`            | Compila TypeScript e cria build otimizado    |
| `npm run preview`          | Visualiza build de produção localmente       |
| `npm run lint`             | Executa ESLint para verificação de qualidade |
| `npm run debug:responses`  | Debug das respostas do Google Forms          |
| `npm run generate:insight` | Gera insights IA do dashboard                |
| `npm run generate:cross`   | Análise cruzada entre seções                 |

---

## Deploy

A aplicação está configurada para deploy automático no **Vercel**:

1. Faça push do repositório para GitHub
2. Conecte o repositório ao [Vercel](https://vercel.com)
3. Configure variáveis de ambiente:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_PROJECT_ID`
   - Demais credenciais Firebase
4. Deploy automático a cada push na branch main

**Acesso em Produção**: [protegix.vercel.app](https://protegix.vercel.app)

---

## Componentes Principais

### Quiz Component (`src/components/quiz/Quiz.tsx`)

**Funcionalidades:**

- Seleciona 15 perguntas aleatórias do banco de 30
- Sistema de feedback visual imediato
- Explicações pedagógicas após cada resposta
- Cálculo de pontuação em tempo real
- Mensagens personalizadas baseadas no resultado final
- Integração com Firebase para salvamento opcional de scores

### Leaderboard Component (`src/components/quiz/Leaderboard.tsx`)

**Funcionalidades:**

- Exibe top 10 pontuações
- Colapsível para economizar espaço
- Ranking com posição, nome, score e %
- Atualização em tempo real do Firebase
- Estados de carregamento e erro

### Dashboard (`src/pages/Home.tsx`)

**Visualizações:**

- Gráfico de barras com respostas por pergunta
- Gráfico de pizza com percentuais
- Gráfico de linhas com tendências
- Análise IA gerada automaticamente
- Métricas agregadas de respostas

---

## Dados do Quiz

**Banco de Questões**: 50 perguntas sobre segurança digital
**Distribuição por Nível:**

- Nível Muito Fácil: 10 questões
- Nível Fácil: 10 questões
- Nível Médio: 10 questões
- Nível Difícil: 10 questões
- Nível Muito Difícil: 10 questões

**Tópicos Cobertos:**

- Senhas e autenticação
- Phishing e engenharia social
- Privacidade e dados
- Navegação segura
- Vírus e malware
- Redes WiFi públicas
- Backup e recuperação
- Segurança mobile
- E muito mais...

---

## Contribuição com ODS

Este projeto contribui ativamente com os **Objetivos de Desenvolvimento Sustentável (ODS)** das Nações Unidas:

| ODS        | Descrição                            | Contribuição                                                  |
| ---------- | ------------------------------------ | ------------------------------------------------------------- |
| **ODS 4**  | Educação de Qualidade                | Fornece educação acessível sobre segurança digital para todos |
| **ODS 9**  | Indústria, Inovação e Infraestrutura | Utiliza IA e tecnologia para conscientização                  |
| **ODS 16** | Paz, Justiça e Instituições Eficazes | Promove consciência crítica e segurança da informação         |

---

## Autor

**Robson Durães**

- [LinkedIn](https://linkedin.com/in/duraesrobson)
- [Instagram](https://instagram.com/duraesrobson_)
- [GitHub](https://github.com/duraesrobson)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

Desenvolvido com ❤️ para a comunidade educacional.

---

**Última atualização**: Abril de 2026
