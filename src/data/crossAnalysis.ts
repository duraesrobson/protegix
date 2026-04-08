export type CrossAnalysisTableData = {
  title: string
  rowLabel: string
  columnLabel: string
  columns: string[]
  rows: {
    label: string
    values: Record<string, number | { count: number; percentage: number }>
  }[]
  insight: string
}

export const crossAnalysisData: CrossAnalysisTableData[] = [
  {
    title: "Faixa Etária x Autenticação em Duas Etapas",
    rowLabel: "Faixa etária",
    columnLabel: "Uso de 2FA",
    columns: ["Não", "Sim", "Em algumas contas", "Não sei o que é"],
    rows: [
      {
        label: "18 a 24 anos",
        values: {
          "Não": 4,
          "Sim": 5,
          "Em algumas contas": 1,
          "Não sei o que é": 1
        }
      },
      {
        label: "25 a 34 anos",
        values: {
          "Sim": 7,
          "Não sei o que é": 2,
          "Não": 1
        }
      },
      {
        label: "35 a 44 anos",
        values: {
          "Não": 1
        }
      },
      {
        label: "45 anos ou mais",
        values: {
          "Sim": 2
        }
      },
      {
        label: "Menos de 18 anos",
        values: {
          "Sim": 1
        }
      }
    ],
    insight:
      "Os dados mostram que a autenticação em duas etapas aparece com maior presença entre participantes de 18 a 34 anos, embora ainda existam respostas indicando não utilização ou desconhecimento do recurso. Isso sugere que, mesmo entre grupos mais conectados digitalmente, ainda há espaço para ampliar a conscientização sobre mecanismos adicionais de proteção de contas."
  },
  {
    title: "Escolaridade x Conhecimento sobre LGPD",
    rowLabel: "Escolaridade",
    columnLabel: "Já ouviu falar da LGPD?",
    columns: ["Sim", "Não"],
    rows: [
      {
        label: "Ensino médio completo",
        values: {
          "Sim": 5,
          "Não": 4
        }
      },
      {
        label: "Ensino superior incompleto",
        values: {
          "Sim": 12,
          "Não": 1
        }
      },
      {
        label: "Ensino superior completo",
        values: {
          "Sim": 3
        }
      }
    ],
    insight:
      "Observa-se que o conhecimento sobre a LGPD é mais frequente entre participantes com ensino superior incompleto e completo. Já entre os respondentes com ensino médio completo, o nível de familiaridade se mostra mais dividido, indicando que a escolaridade pode influenciar o contato com temas ligados à proteção de dados e privacidade."
  },
  {
    title: "Frequência de Uso de IA x Verificação das Respostas",
    rowLabel: "Frequência de uso de IA",
    columnLabel: "Verificação das respostas da IA",
    columns: ["Nunca", "Sempre", "Às vezes"],
    rows: [
      {
        label: "Diariamente",
        values: {
          "Nunca": { count: 2, percentage: 15 },
          "Sempre": { count: 4, percentage: 31 },
          "Às vezes": { count: 7, percentage: 54 }
        }
      },
      {
        label: "Semanalmente",
        values: {
          "Às vezes": { count: 3, percentage: 38 },
          "Sempre": { count: 4, percentage: 50 },
          "Nunca": { count: 1, percentage: 13 }
        }
      },
      {
        label: "Raramente",
        values: {
          "Nunca": { count: 1, percentage: 25 },
          "Sempre": { count: 1, percentage: 25 },
          "Às vezes": { count: 2, percentage: 50 }
        }
      }
    ],
    insight:
      "O cruzamento indica que a verificação das respostas geradas por IA não ocorre de forma totalmente consistente, mesmo entre usuários que utilizam essas ferramentas com frequência diária. Predomina o comportamento de conferir apenas às vezes, o que revela um uso relativamente disseminado da IA, mas ainda acompanhado por uma postura crítica parcial diante das informações produzidas."
  }
]