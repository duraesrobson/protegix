# Dicionário de Dados — Pesquisa Protegix

> Amostragem: 101 participantes
> Período: Abril de 2026

## Variáveis do Questionário

| ID | Pergunta | Tipo | Valores Possíveis |
|---|---|---|---|
| `faixa_etaria` | Distribuição por grupos de idade | Categórica | Menos de 18 anos, 18-24, 25-34, 35-44, 45+ |
| `escolaridade` | Grau de escolaridade | Categórica ordinal | Fund. incompleto, Fund. completo, Médio incompleto, Médio completo, Superior incompleto, Superior completo |
| `tempo_uso` | Exposição diária à rede | Categórica ordinal | Menos de 3h, 3h-6h, Mais de 6h, O tempo todo |
| `tipo_conexao` | Tecnologias de conexão | Categórica | Wi-Fi Privado, Dados Móveis, Trabalho/Faculdade, Cabo, Wi-Fi Público |
| `senhas_diferentes` | Diversificação de senhas | Categórica ordinal | Sempre, Às vezes, Nunca |
| `2fa` | Autenticação em duas etapas | Categórica | Sim, Em algumas contas, Não, Não sei o que é |
| `golpe` | Vítima de golpes online | Categórica | Sim, Não, Não tenho certeza |
| `disp_principal` | Principal dispositivo de acesso | Categórica | Celular, Notebook, Computador |
| `disp_atualizacao` | Atualização de dispositivos | Categórica ordinal | Sempre, Às vezes, Raramente, Nunca |
| `verifica_sites` | Verificação da segurança de sites | Categórica ordinal | Sempre, Às vezes, Nunca |
| `qualidade_internet` | Qualidade da internet | Categórica ordinal | Excelente, Boa, Regular, Ruim |
| `falta_de_acesso` | Deixou de realizar atividades por falta de tecnologia | Categórica | Sim, Não |
| `lgpd` | Conhecimento sobre a LGPD | Categórica | Sim, Não |
| `lgpd_nivel` | Nível de conhecimento LGPD | Categórica ordinal | Alto, Médio, Baixo, Nenhum |
| `lgpd_termos` | Leitura de termos de uso | Categórica ordinal | Sempre, Às vezes, Nunca |
| `lgpd_uso` | Deixou de usar serviço por privacidade | Categórica | Sim, Não |
| `utiliza_ia` | Uso de IA generativa | Categórica | Sim, Não |
| `frequencia_ia` | Frequência de uso de IA | Categórica ordinal | Diariamente, Semanalmente, Raramente, Nunca |
| `finalidade_ia` | Finalidade de uso da IA | Categórica | Uso Geral, Estudos, Trabalho, Não utilizo, Curiosidade |
| `confianca_ia` | Confiança nas respostas de IA | Categórica ordinal | Muito, Parcialmente, Pouco, Não confio |
| `verificacao_ia` | Verificação de respostas da IA | Categórica ordinal | Sempre, Às vezes, Nunca |

## Variáveis de Confiança (Média 0-100)

| ID | Pergunta | Tipo |
|---|---|---|
| `seg_navegacao` | Confiança na navegação comum | Numérica (0-100) |
| `seg_bancos` | Confiança em apps de banco | Numérica (0-100) |
| `seg_redes` | Confiança em redes sociais | Numérica (0-100) |
| `seg_compras` | Confiança em compras online | Numérica (0-100) |
| `seg_email` | Confiança no uso de e-mail | Numérica (0-100) |

## Estrutura dos Arquivos

| Arquivo | Conteúdo |
|---|---|
| `brutos/respostas-agregadas.csv` | Frequências agregadas por pergunta (formato longo) |
| `brutos/` | Dados brutos individuais (Firebase Firestore) |
| `tratados/` | Índices e métricas derivadas |
