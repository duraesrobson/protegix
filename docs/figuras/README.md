# Figuras — Pesquisa Protegix

## Estrutura

```
/docs/figuras
├── *.svg                → Gráficos individuais por pergunta (21 arquivos)
├── cross/*.png          → Análises cruzadas (6 arquivos)
└── README.md            → Este arquivo
```

## Gráficos Individuais (SVG)

| Arquivo | Pergunta |
|---|---|
| `faixa_etaria.svg` | Distribuição por grupos de idade |
| `escolaridade.svg` | Grau de escolaridade |
| `tempo_uso.svg` | Exposição diária à rede |
| `tipo_conexao.svg` | Tecnologias de conexão |
| `senhas_diferentes.svg` | Diversificação de senhas |
| `2fa.svg` | Autenticação em duas etapas |
| `golpe.svg` | Vítimas de golpes online |
| `disp_principal.svg` | Principal dispositivo de acesso |
| `disp_atualizacao.svg` | Atualização de dispositivos |
| `verifica_sites.svg` | Verificação da segurança de sites |
| `qualidade_internet.svg` | Qualidade da internet |
| `falta_de_acesso.svg` | Impacto da falta de acesso |
| `lgpd.svg` | Conhecimento sobre a LGPD |
| `lgpd_nivel.svg` | Nível de conhecimento LGPD |
| `lgpd_termos.svg` | Leitura de termos de uso |
| `lgpd_uso.svg` | Impacto da privacidade |
| `utiliza_ia.svg` | Uso de IA generativa |
| `frequencia_ia.svg` | Frequência de uso de IA |
| `finalidade_ia.svg` | Finalidades de uso da IA |
| `confianca_ia.svg` | Confiança nas respostas de IA |
| `verificacao_ia.svg` | Verificação de respostas da IA |

## Análises Cruzadas (PNG)

| Arquivo | Variáveis |
|---|---|
| `faixa_etaria_x_2fa.png` | Faixa etária × Autenticação em duas etapas |
| `escolaridade_x_lgpd.png` | Escolaridade × Conhecimento LGPD |
| `frequencia_ia_x_verificacao_ia.png` | Frequência IA × Verificação IA |
| `lgpd_x_leitura_termos.png` | Conhecimento LGPD × Leitura de termos |
| `tempo_uso_x_golpe.png` | Tempo de uso × Golpes |
| `verifica_sites_x_golpe.png` | Verificação de sites × Golpes |

## Geração

Os gráficos SVG são gerados pelo script `src/scripts/export-svg-charts.ts` na raiz do projeto:

```bash
npx tsx src/scripts/export-svg-charts.ts
```
