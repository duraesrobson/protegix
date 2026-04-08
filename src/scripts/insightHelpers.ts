export type FirestoreAnswer = {
  perguntaId?: string
  opcao?: string | number
  timestamp?: unknown
}

export function countAnswers(
  docs: FirestoreAnswer[],
  perguntaId: string
): Record<string, number> {
  const counts: Record<string, number> = {}

  for (const item of docs) {
    if (item.perguntaId !== perguntaId) continue

    const raw = item.opcao
    if (raw === undefined || raw === null) continue

    const key = String(raw).trim()
    counts[key] = (counts[key] || 0) + 1
  }

  return counts
}

function extractPercentage(value: string | number | undefined): number {
  const raw = String(value ?? "").trim()
  const match = raw.match(/\d+/)
  return match ? Number(match[0]) : NaN
}

export function averageAnswers(
  docs: FirestoreAnswer[],
  perguntaId: string
): number | null {
  const values = docs
    .filter(item => item.perguntaId === perguntaId)
    .map(item => extractPercentage(item.opcao))
    .filter(value => !Number.isNaN(value))

  if (!values.length) return null

  const total = values.reduce((acc, value) => acc + value, 0)
  return Math.round(total / values.length)
}