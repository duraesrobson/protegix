import "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import { adminDb } from "../lib/firebaseAdmin"
import {
  averageAnswers,
  countAnswers,
  type FirestoreAnswer
} from "./insightHelpers"
import { questionMetadata } from "./questionMetadata"

type FirestoreDoc = FirestoreAnswer & {
  id: string
}

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
})

async function getAllAnswers(): Promise<FirestoreDoc[]> {
  const snapshot = await adminDb.collection("respostas").get()

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as FirestoreAnswer)
  }))
}

function countUniqueParticipants(docs: FirestoreDoc[]) {
  const participantIds = new Set<string>()

  for (const doc of docs) {
    const prefix = doc.id.split("_")[0]
    participantIds.add(prefix)
  }

  return participantIds.size
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const categories = {
  seguranca: {
    titulo: "Segurança Digital",
    perguntas: [
      "seg_navegacao",
      "seg_bancos",
      "seg_redes",
      "seg_compras",
      "seg_email"
    ]
  },
  higieneDigital: {
    titulo: "Higiene Digital",
    perguntas: ["senhas_diferentes", "2fa", "golpe"]
  },
  habitosEDispositivos: {
    titulo: "Hábitos e Dispositivos",
    perguntas: [
      "disp_principal",
      "disp_atualizacao",
      "verifica_sites",
      "qualidade_internet",
      "falta_de_acesso"
    ]
  },
  perfil: {
    titulo: "Perfil do Participante",
    perguntas: ["faixa_etaria", "escolaridade", "tempo_uso", "tipo_conexao"]
  },
  ia: {
    titulo: "Inteligência Artificial",
    perguntas: [
      "utiliza_ia",
      "frequencia_ia",
      "finalidade_ia",
      "confianca_ia",
      "verificacao_ia"
    ]
  },
  lgpd: {
    titulo: "LGPD e Privacidade",
    perguntas: ["lgpd", "lgpd_nivel", "lgpd_termos", "lgpd_uso"]
  }
}

async function generateAllAnalyses(
  docs: FirestoreDoc[]
): Promise<Record<string, string>> {
  let dadosPorCategoria = ""
  const perguntasMap: Record<string, string> = {}

  for (const [, category] of Object.entries(categories)) {
    dadosPorCategoria += `## ${category.titulo}\n\n`

    for (const perguntaId of category.perguntas) {
      const titulo =
        questionMetadata[perguntaId as keyof typeof questionMetadata]
      const isAverage = perguntaId.startsWith("seg_")

      const dados = isAverage
        ? averageAnswers(docs, perguntaId)
        : countAnswers(docs, perguntaId)

      perguntasMap[perguntaId] = titulo

      dadosPorCategoria += `### ${titulo}\n`
      dadosPorCategoria += `**Dados:** ${JSON.stringify(dados)}\n\n`
    }
  }

  const prompt = `
Com base nos dados de todas as perguntas abaixo, gere uma análise individual para cada uma.

Regras para cada análise:
- entre 2 a 4 frases
- cite porcentagens específicas dos dados
- destaque padrões positivos ou fragilidades
- não invente informações
- não use lista
- evite jargões técnicos
- linguagem acessível para público geral

Estruture a resposta em markdown, agrupada por categoria, seguindo este formato exato:
## Categoria
### Título da Pergunta
**Análise:** texto da análise aqui...

- no final do arquivo colocar uma análise geral sobre todas as repostas, fazendo analise cruzada se pertinente.

Dados:
${dadosPorCategoria}
`

  const delays = [2000, 5000, 10000]

  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      })

      const text = response.text?.trim()

      if (!text) {
        throw new Error("resposta vazia da IA")
      }

      const analyses: Record<string, string> = {}
      const lines = text.split("\n")
      let currentPerguntaId = ""
      let currentAnalise = ""

      for (const line of lines) {
        const perguntaMatch = line.match(/^### (.+)$/)
        const analiseMatch = line.match(/^\*\*Análise:\*\* (.+)$/)

        if (perguntaMatch) {
          const titulo = perguntaMatch[1].trim()
          for (const [id, t] of Object.entries(perguntasMap)) {
            if (t === titulo) {
              currentPerguntaId = id
              break
            }
          }
        } else if (analiseMatch && currentPerguntaId) {
          currentAnalise = analiseMatch[1].trim()
          analyses[currentPerguntaId] = currentAnalise
        } else if (currentPerguntaId && line.trim() && !line.startsWith("#")) {
          currentAnalise += " " + line.trim()
          analyses[currentPerguntaId] = currentAnalise
        }
      }

      return analyses
    } catch (error: unknown) {
      const errorStatus = (error as { status?: number })?.status
      const retryable = errorStatus === 503 || errorStatus === 429

      if (!retryable || attempt === 4) {
        throw error
      }

      const delay = delays[attempt - 1] ?? 10000
      console.warn(
        `tentativa ${attempt} falhou com status ${errorStatus}. tentando novamente em ${delay}ms...`
      )
      await sleep(delay)
    }
  }

  throw new Error("não foi possível gerar as análises")
}

function buildContent(
  docs: FirestoreDoc[],
  totalParticipantes: number,
  analyses: Record<string, string>
): string {
  let content = `# Análise Individual das Perguntas\n\n`
  content += `**Total de participantes:** ${totalParticipantes}\n\n`
  content += `---\n\n`

  for (const [, category] of Object.entries(categories)) {
    content += `## ${category.titulo}\n\n`

    for (const perguntaId of category.perguntas) {
      const titulo =
        questionMetadata[perguntaId as keyof typeof questionMetadata]
      const isAverage = perguntaId.startsWith("seg_")

      const dados = isAverage
        ? averageAnswers(docs, perguntaId)
        : countAnswers(docs, perguntaId)

      content += `### ${titulo}\n\n`
      content += `**Dados:** \n\`\`\`json\n${JSON.stringify(dados, null, 2)}\n\`\`\`\n\n`
      content += `**Análise:** ${analyses[perguntaId] || "[erro]"}\n\n`
      content += `---\n\n`
    }
  }

  return content
}

async function main() {
  console.log("iniciando geração de análises por pergunta...")

  const docs = await getAllAnswers()
  const totalParticipantes = countUniqueParticipants(docs)

  console.log(`total de participantes: ${totalParticipantes}`)
  console.log(`total de respostas: ${docs.length}`)
  console.log("gerando análises com IA (único request)...")

  const analyses = await generateAllAnalyses(docs)

  const content = buildContent(docs, totalParticipantes, analyses)

  const fs = await import("fs/promises")
  const path = await import("path")

  const outputPath = path.join(
    process.cwd(),
    "public",
    "docs",
    "graficos",
    "responses-analysis.md"
  )

  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, content, "utf-8")

  console.log(`\nanálise salva em: ${outputPath}`)
  console.log("processo concluído!")
}

main().catch(error => {
  console.error("erro ao gerar análises:", error)
  process.exit(1)
})
