# Protegix - Segurança Digital

Projeto desenvolvido com foco em conscientização sobre **segurança digital**, permitindo a visualização de dados reais coletados via Google Forms, além de oferecer um quiz educativo e conteúdo educativo completo sobre segurança digital.

---

## Funcionalidades

### Dashboard de Dados

- Exibe respostas do Google Forms em gráficos interativos (barras, pizza, linhas)
- Atualização dinâmica via Google Sheets + Firebase
- Visualização simples e acessível com Material-UI
- Métricas em tempo real sobre percepção de segurança digital

### Análise de Dados

- Visualização interativa dos dados coletados
- Métricas e estatísticas em tempo real
- Padrões identificados nas respostas dos usuários

### Quiz Interativo

- 10+ perguntas sobre segurança digital
- Feedback imediato (correto = verde / errado = vermelho)
- Explicação detalhada após cada resposta
- Navegação entre perguntas com pontuação acumulada
- Reinício automático ao completar todas as perguntas

### Página Educativa "Aprenda"

- Conteúdo completo sobre segurança digital
- Seções organizadas: conceitos básicos, ameaças comuns, ações práticas
- 6 dicas detalhadas sobre boas práticas
- Cards informativos sobre senhas, phishing e privacidade
- Design responsivo e acessível

---

## Tecnologias Utilizadas

### Frontend

- **React 19** - Framework JavaScript moderno
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápido e otimizado
- **Material-UI (MUI)** - Componentes de interface modernos
- **React Router** - Navegação SPA
- **Sass/SCSS** - Estilização avançada

### Backend & Dados

- **Firebase Firestore** - Banco de dados NoSQL em tempo real
- **Google Forms + Google Sheets** - Coleta e armazenamento de dados
- **Axios** - Requisições HTTP

### Desenvolvimento

- **ESLint** - Linting e qualidade de código
- **TypeScript ESLint** - Regras específicas para TypeScript
- **Vercel** - Deploy e hospedagem

### Outros

- **MUI X CHARTS** - Biblioteca de gráficos
- **Emotion** - CSS-in-JS para Material-UI
- **React Icons** - Ícones para interface

---

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── charts/         # Gráficos (Bar, Pie, Line)
│   ├── home/           # Seções da página inicial
│   ├── layout/         # Layout e navegação
│   ├── learn/          # Componentes educacionais
│   ├── quiz/           # Componentes do quiz
│   └── ui/             # Componentes de UI básicos
├── data/               # Dados estáticos (perguntas do quiz)
├── hooks/              # Hooks customizados
├── lib/                # Configurações (Firebase)
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Dashboard principal
│   ├── QuizPage.tsx    # Página do quiz
│   └── learn/          # Página educativa
├── styles/             # Estilos globais
├── theme/              # Tema Material-UI
├── types/              # Definições TypeScript
└── utils/              # Utilitários (insights IA)
```

---

## Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Google (para Google Forms/Sheets)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/duraesrobson/protegix.git
   cd protegix-app
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Configure o Firebase**
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Configure Firestore Database
   - Copie as credenciais para `src/lib/firebase.ts`

4. **Configure Google Forms/Sheets**
   - Crie um formulário no Google Forms
   - Configure uma planilha Google Sheets para receber os dados
   - Configure a integração com Firebase

5. **Execute o projeto**

   ```bash
   npm run dev
   ```

6. **Build para produção**
   ```bash
   npm run build
   npm run preview
   ```

---

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter ESLint

---

## Deploy

O projeto está configurado para deploy automático no **Vercel**:

1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente do Firebase
3. Deploy automático a cada push na branch main

---

## Contribuição com ODS

Este projeto contribui com os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU:

- **ODS 4** - Educação de Qualidade: Promove educação em segurança digital
- **ODS 9** - Indústria, Inovação e Infraestrutura: Uso de tecnologia para conscientização
- **ODS 16** - Paz, Justiça e Instituições Eficazes: Incentiva acesso consciente à informação

---

## Status

**Em produção** - [Acesse aqui](https://protegix.vercel.app)

---

## Autor

**Robson Durães**

- [LinkedIn](https://linkedin.com/in/duraesrobson)
- [Instagram](https://instagram.com/duraesrobson_)
---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
