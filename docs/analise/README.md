# Análise — Pesquisa Protegix

## Estrutura

```
/docs/analise
├── README.md                       ← Este índice
└── notebooks/
    └── analise-protegix.ipynb      → Jupyter notebook com análise completa
```

Os scripts de análise estão em `src/scripts/` na raiz do projeto e incluem:

| Script | Descrição |
|---|---|
| `export-svg-charts.ts` | Gera gráficos SVG em `/docs/figuras/` |
| `generatePerQuestionAnalysis.ts` | Gera o relatório devolutivo em `/docs/` |
| `generateDashboardInsight.ts` | Análises para o dashboard |
| `generateChartInsight.tsx` | Geração de insights textuais para gráficos |
| `crossAnalysis/` | Análises cruzadas entre variáveis |

## Como executar

```bash
npx tsx src/scripts/export-svg-charts.ts
npx tsx src/scripts/generatePerQuestionAnalysis.ts
```
