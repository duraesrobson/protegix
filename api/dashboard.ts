import type { VercelRequest, VercelResponse } from "@vercel/node"
import { google } from "googleapis"

type ChartItem = {
  label: string
  value: number
}

type DashboardResponse = {
  pcd: ChartItem[]
  crucial: ChartItem[]
  iA: ChartItem[]
}

function countAnswers(rows: string[][], columnTitle: string): ChartItem[] {
  if (!rows.length) return []

  const header = rows[0]
  const dataRows = rows.slice(1)

  const columnIndex = header.indexOf(columnTitle)

  if (columnIndex === -1) {
    throw new Error(`Coluna não encontrada: ${columnTitle}`)
  }

  const counts: Record<string, number> = {}

  for (const row of dataRows) {
    const rawValue = row[columnIndex]

    if (!rawValue) continue

    const answer = rawValue.trim()

    if (!answer) continue

    counts[answer] = (counts[answer] ?? 0) + 1
  }

  return Object.entries(counts).map(([label, value]) => ({
    label,
    value
  }))
}

function getGooglePrivateKey() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!privateKey) {
    throw new Error("GOOGLE_PRIVATE_KEY não configurada")
  }

  return privateKey.replace(/\\n/g, "\n")
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = getGooglePrivateKey()
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID
    const sheetName = process.env.GOOGLE_SHEETS_SHEET_NAME

    if (!clientEmail || !spreadsheetId || !sheetName) {
      return res.status(500).json({
        error: "Variáveis de ambiente ausentes"
      })
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    })

    const sheets = google.sheets({
      version: "v4",
      auth
    })

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:ZZ`
    })

    const rows = (response.data.values ?? []) as string[][]

    if (!rows.length) {
      return res.status(200).json({
        pcd: [],
        crucial: [],
        iA: []
      } satisfies DashboardResponse)
    }

    const data: DashboardResponse = {
      pcd: countAnswers(
        rows,
        "Você se identifica como uma pessoa com deficiência (física, visual, auditiva, intelectual, etc.)?"
      ),
      crucial: countAnswers(
        rows,
        "Quão crucial é a capacidade do clickSOS de enviar sua localização em tempo real e de forma contínua (e não apenas um ponto fixo) para seus contatos de emergência?"
      ),
      iA: countAnswers(
        rows,
        "A inclusão de Inteligência Artificial (IA) para personalizar e otimizar o tom da mensagem de emergência para os seus contatos aumenta o valor do serviço?"
      )
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error("Erro ao buscar dashboard:", error)

    return res.status(500).json({
      error: "Erro interno ao processar dashboard"
    })
  }
}
