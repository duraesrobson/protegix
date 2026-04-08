import "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import { admin, adminDb } from "../../lib/firebaseAdmin"
import type { FirestoreAnswer } from "../insightHelpers"
import {
  groupAnswersByParticipant,
  crossTabulateWithPercentages,
  type FirestoreDoc
} from "./crossAnalysis"
import { buildCrossAnalysisTable } from "./crossAnalysisFormatter"

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

type CrossTableCell = number | { count: number; percentage: number }

type CrossAnalysisTableInput = {
  id: string
  title: string
  rowLabel: string
  columnLabel: string
  columns: string[]
  rows: Array<{
    label: string
    values: Record<string, CrossTableCell>
  }>
}

type CrossAnalysisSaveData = CrossAnalysisTableInput & {
  insight: string
  createdAt: FirebaseFirestore.FieldValue
}

async function getAllAnswers(): Promise<FirestoreDoc[]> {
  const snapshot = await adminDb.collection("respostas").get()

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as FirestoreAnswer)
  }))
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function generateCrossInsight(crossData: CrossAnalysisTableInput) {
  const prompt = `
Analise o cruzamento de respostas abaixo em português do Brasil.

Regras:
 escreva apenas 1 parágrafo
- linguagem clara, objetiva e acadêmica, mas natural
- no máximo 80 palavras
- explique apenas os padrões observados nos dados
- não invente informações
- não use lista
- não afirme relação de causa e efeito
- trate os resultados como padrões observados, e não como comprovação
- priorize a interpretação pelas porcentagens
- quando houver poucos casos, mencione isso de forma breve e natural, sem repetir sempre a mesma frase
- varie a forma de iniciar e construir a explicação
- evite repetir expressões como "os dados indicam", "os dados sugerem", "associação", "tendência observada" e "limita generalizações" em todos os textos
- escreva como uma análise interpretativa curta de relatório acadêmico, sem soar robótico


Dados:
${JSON.stringify(crossData, null, 2)}
`

  const delays = [2000, 5000, 10000]

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      })

      const text = response.text?.trim()

      if (!text) {
        throw new Error("resposta vazia da IA")
      }

      return text
    } catch (error: any) {
      const status = error?.status
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

  throw new Error("não foi possível gerar a análise cruzada")
}

async function saveCrossAnalysis(docId: string, data: CrossAnalysisSaveData) {
  await adminDb
    .collection("cross_analysis")
    .doc(docId)
    .set(
      {
        ...data,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    )
}

async function main() {
  const docs = await getAllAnswers()
  const participants = groupAnswersByParticipant(docs)

  console.log("total de participantes agrupados:", participants.length)

  const cross1Raw = crossTabulateWithPercentages(
    participants,
    "faixa_etaria",
    "2fa"
  )
  const cross1Base = buildCrossAnalysisTable({
    id: "faixa_etaria_x_2fa",
    title: "Faixa Etária x Autenticação em Duas Etapas",
    rowLabel: "Faixa etária",
    columnLabel: "Uso de 2FA",
    data: cross1Raw
  }) as CrossAnalysisTableInput

  const cross2Raw = crossTabulateWithPercentages(
    participants,
    "escolaridade",
    "lgpd"
  )
  const cross2Base = buildCrossAnalysisTable({
    id: "escolaridade_x_lgpd",
    title: "Escolaridade x Conhecimento sobre LGPD",
    rowLabel: "Escolaridade",
    columnLabel: "Já ouviu falar da LGPD?",
    data: cross2Raw
  }) as CrossAnalysisTableInput

  const cross3Raw = crossTabulateWithPercentages(
    participants,
    "frequencia_ia",
    "verificacao_ia"
  )
  const cross3Base = buildCrossAnalysisTable({
    id: "frequencia_ia_x_verificacao_ia",
    title: "Frequência de Uso de IA x Verificação das Respostas",
    rowLabel: "Frequência de uso de IA",
    columnLabel: "Verificação das respostas da IA",
    data: cross3Raw
  }) as CrossAnalysisTableInput

  const cross4Raw = crossTabulateWithPercentages(
    participants,
    "tempo_uso",
    "golpe"
  )
  const cross4Base = buildCrossAnalysisTable({
    id: "tempo_uso_x_golpe",
    title: "Tempo de Uso da Internet x Ocorrência de Golpes",
    rowLabel: "Tempo de uso da internet",
    columnLabel: "Já foi vítima de golpe?",
    data: cross4Raw
  }) as CrossAnalysisTableInput

  const cross5Raw = crossTabulateWithPercentages(
    participants,
    "verifica_sites",
    "golpe"
  )
  const cross5Base = buildCrossAnalysisTable({
    id: "verifica_sites_x_golpe",
    title: "Verificação de Sites x Ocorrência de Golpes",
    rowLabel: "Verificação de sites",
    columnLabel: "Já foi vítima de golpe?",
    data: cross5Raw
  }) as CrossAnalysisTableInput

  const cross6Raw = crossTabulateWithPercentages(
    participants,
    "lgpd",
    "lgpd_termos"
  )
  const cross6Base = buildCrossAnalysisTable({
    id: "lgpd_x_leitura_termos",
    title: "Conhecimento sobre LGPD x Leitura de Termos de Uso",
    rowLabel: "Conhece a LGPD?",
    columnLabel: "Leitura de termos de uso",
    data: cross6Raw
  }) as CrossAnalysisTableInput

  const cross1Insight = await generateCrossInsight(cross1Base)
  const cross2Insight = await generateCrossInsight(cross2Base)
  const cross3Insight = await generateCrossInsight(cross3Base)
  const cross4Insight = await generateCrossInsight(cross4Base)
  const cross5Insight = await generateCrossInsight(cross5Base)
  const cross6Insight = await generateCrossInsight(cross6Base)

  await saveCrossAnalysis(cross1Base.id, {
    ...cross1Base,
    insight: cross1Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  await saveCrossAnalysis(cross2Base.id, {
    ...cross2Base,
    insight: cross2Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  await saveCrossAnalysis(cross3Base.id, {
    ...cross3Base,
    insight: cross3Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  await saveCrossAnalysis(cross4Base.id, {
    ...cross4Base,
    insight: cross4Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  await saveCrossAnalysis(cross5Base.id, {
    ...cross5Base,
    insight: cross5Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  await saveCrossAnalysis(cross6Base.id, {
    ...cross6Base,
    insight: cross6Insight,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })

  console.log("análises cruzadas salvas com sucesso")
}

main().catch(error => {
  console.error("erro ao gerar cruzamentos:", error)
  process.exit(1)
})
