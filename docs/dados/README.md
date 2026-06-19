# Dados — Pesquisa Protegix

## Estrutura

```
/docs/dados
├── brutos/        → Dados brutos (CSV agregado)
├── tratados/      → Dados processados e transformados
└── dicionario/    → Dicionário de variáveis e documentação
```

## Fonte

Os dados foram coletados via formulário online (Firebase Firestore) com 101 participantes em Abril de 2026.

## Exportar dados do Firebase

```bash
npx tsx src/scripts/export-svg-charts.ts              # Gera gráficos SVG
npx tsx src/scripts/generatePerQuestionAnalysis.ts    # Gera análise textual
```

Para exportar respostas individuais como CSV, use o Firebase Console > Firestore > Exportar coleção "respostas".
