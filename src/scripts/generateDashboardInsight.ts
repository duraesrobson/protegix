import "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import { admin, adminDb } from "../lib/firebaseAdmin"
import {
  averageAnswers,
  countAnswers,
  type FirestoreAnswer
} from "./insightHelpers"
import { getInsightMeta, saveInsightMeta } from "./insightMeta"
import { questionMetadata } from "./questionMetadata"

type FirestoreDoc = FirestoreAnswer & {
  id: string
}

// Inicializa o cliente da IA generativa Gemini com a chave de API
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

async function getAllAnswers(): Promise<FirestoreDoc[]> {
  // Busca todas as respostas brutas armazenadas na coleção do Firestore
  const snapshot = await adminDb.collection("respostas").get()

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as FirestoreAnswer)
  }))
}

function countUniqueParticipants(docs: FirestoreDoc[]) {
  // Identifica participantes únicos baseando-se no prefixo do ID do documento
  const participantIds = new Set<string>()

  for (const doc of docs) {
    const prefix = doc.id.split("_")[0]
    participantIds.add(prefix)
  }

  return participantIds.size
}

function buildAverageQuestion(
  docs: FirestoreDoc[],
  perguntaId: keyof typeof questionMetadata
) {
  // Estrutura o objeto para perguntas que possuem média numérica (ex: escalas de 1 a 5)
  return {
    perguntaId,
    titulo: questionMetadata[perguntaId],
    media: averageAnswers(docs, perguntaId)
  }
}

function buildCountQuestion(
  docs: FirestoreDoc[],
  perguntaId: keyof typeof questionMetadata
) {
  // Estrutura o objeto para perguntas de múltipla escolha, contando ocorrências de cada opção
  return {
    perguntaId,
    titulo: questionMetadata[perguntaId],
    dados: countAnswers(docs, perguntaId)
  }
}

function buildSummary(docs: FirestoreDoc[]) {
  // Agrupa todos os dados processados em categorias temáticas para enviar à IA
  return {
    totalParticipantes: countUniqueParticipants(docs),
    totalRespostasIndividuais: docs.length,

    seguranca: {
      navegacao: buildAverageQuestion(docs, "seg_navegacao"),
      bancos: buildAverageQuestion(docs, "seg_bancos"),
      redes: buildAverageQuestion(docs, "seg_redes"),
      compras: buildAverageQuestion(docs, "seg_compras"),
      email: buildAverageQuestion(docs, "seg_email")
    },

    higieneDigital: {
      senhasDiferentes: buildCountQuestion(docs, "senhas_diferentes"),
      usa2FA: buildCountQuestion(docs, "2fa"),
      golpe: buildCountQuestion(docs, "golpe")
    },

    habitosEDispositivos: {
      dispositivoPrincipal: buildCountQuestion(docs, "disp_principal"),
      atualizacaoDispositivos: buildCountQuestion(docs, "disp_atualizacao"),
      verificaSites: buildCountQuestion(docs, "verifica_sites"),
      qualidadeInternet: buildCountQuestion(docs, "qualidade_internet"),
      faltaDeAcesso: buildCountQuestion(docs, "falta_de_acesso")
    },

    perfil: {
      faixaEtaria: buildCountQuestion(docs, "faixa_etaria"),
      escolaridade: buildCountQuestion(docs, "escolaridade"),
      tempoUso: buildCountQuestion(docs, "tempo_uso"),
      tipoConexao: buildCountQuestion(docs, "tipo_conexao")
    },

    ia: {
      utilizaIA: buildCountQuestion(docs, "utiliza_ia"),
      frequenciaIA: buildCountQuestion(docs, "frequencia_ia"),
      finalidadeIA: buildCountQuestion(docs, "finalidade_ia"),
      confiancaIA: buildCountQuestion(docs, "confianca_ia"),
      verificacaoIA: buildCountQuestion(docs, "verificacao_ia")
    },

    lgpd: {
      conheceLGPD: buildCountQuestion(docs, "lgpd"),
      nivelLGPD: buildCountQuestion(docs, "lgpd_nivel"),
      leituraTermos: buildCountQuestion(docs, "lgpd_termos"),
      impactoPrivacidade: buildCountQuestion(docs, "lgpd_uso")
    }
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateInsight(summary: unknown) {
  // Define as instruções (prompt) para a IA gerar o texto analítico acadêmico
  const prompt = `
Com base nos dados agregados abaixo, gere uma análise geral em português do Brasil, com linguagem clara, objetiva e acadêmica, em até 2 parágrafos.

Os objetos incluem:
- perguntaId: identificador técnico da pergunta
- titulo: descrição legível da pergunta
- media: valor médio quando aplicável
- dados: distribuição das respostas quando aplicável

Regras:
- use principalmente o campo "titulo" para interpretar cada pergunta
- destaque padrões positivos e fragilidades
- comente segurança digital, hábitos online, uso de IA e proteção de dados
- nao use palavras interpretativas como "predominantemente", "maioria". troque por porcentagens
- comparação entre grupos se pertinente à análise 
- não invente informações
- não use lista
- mantenha tom interpretativo
- no máximo 500 palavras
- evite jargões técnicos
- use linguagem acessível para público geral

Dados:
${JSON.stringify(summary, null, 2)}
`

  // Configuração de intervalos para tentativas de reprocessamento em caso de erro na API
  const delays = [2000, 5000, 10000]

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      // Chama o modelo Gemini para processar o resumo e gerar o texto
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      })

      const text = response.text?.trim()

      if (!text) {
        throw new Error("resposta vazia da IA")
      }

      return text
    } catch (error: unknown) {
      const status = (error as { status?: number })?.status
      const retryable = status === 503 || status === 429

      if (!retryable || attempt === 4) {
        throw error
      }

      const delay = delays[attempt - 1] ?? 10000
      console.warn(
        `tentativa ${attempt} falhou com status ${status}. tentando novamente em ${delay}ms...`
      )
      await sleep(delay)
    }
  }

  throw new Error("não foi possível gerar a análise")
}

async function saveInsight(content: string, totalParticipantes: number) {
  // Salva o texto gerado pela IA no Firestore para exibição no dashboard
  const version = new Date().toISOString().slice(0, 10)

  await adminDb.collection("dashboard_insights").doc("daily_summary").set({
    content,
    totalParticipantes,
    version,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })
}

async function main() {
  // Fluxo principal: busca dados, gera resumo e verifica se há novos participantes suficientes
  const docs = await getAllAnswers()
  const summary = buildSummary(docs)

  console.log("resumo gerado:")
  console.log(JSON.stringify(summary, null, 2))

  // Controle para evitar geração desnecessária de insights se houver poucos dados novos
  const meta = await getInsightMeta()
  const novosParticipantes =
    summary.totalParticipantes - meta.lastAnalyzedParticipants

  console.log("último total analisado:", meta.lastAnalyzedParticipants)
  console.log("total atual de participantes:", summary.totalParticipantes)
  console.log("novos participantes desde a última análise:", novosParticipantes)

  if (novosParticipantes < 5) {
    console.log("menos de 5 novos participantes. insight não será gerado.")
    return
  }

  // Gera o texto via IA
  const content = await generateInsight(summary)

  // Persiste o resultado e atualiza os metadados de controle
  await saveInsight(content, summary.totalParticipantes)
  await saveInsightMeta(summary.totalParticipantes)

  const savedDoc = await adminDb
    .collection("dashboard_insights")
    .doc("daily_summary")
    .get()

  console.log("documento salvo existe?", savedDoc.exists)
  console.log("dados salvos:", JSON.stringify(savedDoc.data(), null, 2))

  console.log("análise salva com sucesso")
}

main().catch(error => {
  console.error("erro ao gerar análise:", error)
  process.exit(1)
})
