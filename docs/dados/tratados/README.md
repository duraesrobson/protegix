# Dados Tratados — Pesquisa Protegix

Dados processados e transformados a partir dos brutos, prontos para análise.

## Arquivos

| Arquivo | Descrição |
|---|---|
| `indices-gerais.csv` | Índices compostos calculados por dimensão da pesquisa |
| `escalas-confianca.csv` | Médias de confiança por contexto (0–100) |

## Índices Calculados

| Índice | Variáveis envolvidas | Interpretação |
|---|---|---|
| Higiene Digital | senhas_diferentes, 2fa | % de respostas positivas em práticas de segurança |
| Exposição Digital | tempo_uso, tipo_conexao | Nível de exposição a riscos online |
| Letramento LGPD | lgpd, lgpd_nivel, lgpd_termos | Conhecimento e engajamento com privacidade |
| Adoção de IA | utiliza_ia, frequencia_ia, finalidade_ia | Nível de integração da IA no cotidiano |

## Geração

Os CSVs podem ser gerados a partir dos dados brutos via script:

```bash
npx tsx src/scripts/exportar-indices.ts
```
