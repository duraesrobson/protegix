import type { FirestoreAnswer } from "../insightHelpers"

export type FirestoreDoc = FirestoreAnswer & {
  id: string
}

export type ParticipantAnswers = {
  participantId: string
  answers: Record<string, string | number>
}

/**
 * Agrupa todas as respostas por participante.
 * Exemplo:
 * L10_2fa + L10_lgpd + L10_faixa_etaria
 * viram um único objeto do participante L10
 */
export function groupAnswersByParticipant(
  docs: FirestoreDoc[]
): ParticipantAnswers[] {
  const grouped = new Map<string, Record<string, string | number>>()

  for (const doc of docs) {
    const participantId = doc.id.split("_")[0]

    if (!participantId || !doc.perguntaId || doc.opcao == null) {
      continue
    }

    if (!grouped.has(participantId)) {
      grouped.set(participantId, {})
    }

    grouped.get(participantId)![doc.perguntaId] = doc.opcao
  }

  return Array.from(grouped.entries()).map(([participantId, answers]) => ({
    participantId,
    answers
  }))
}

/**
 * Faz o cruzamento entre duas perguntas.
 * Exemplo:
 * faixa_etaria x 2fa
 */
export function crossTabulate(
  participants: ParticipantAnswers[],
  rowQuestionId: string,
  colQuestionId: string
) {
  const table: Record<string, Record<string, number>> = {}

  for (const participant of participants) {
    const rowValue = participant.answers[rowQuestionId]
    const colValue = participant.answers[colQuestionId]

    if (!rowValue || !colValue) continue

    const rowKey = String(rowValue)
    const colKey = String(colValue)

    if (!table[rowKey]) {
      table[rowKey] = {}
    }

    if (!table[rowKey][colKey]) {
      table[rowKey][colKey] = 0
    }

    table[rowKey][colKey] += 1
  }

  return table
}

/**
 * Retorna o mesmo cruzamento, mas com porcentagens por linha.
 * Exemplo:
 * dentro da faixa "18 a 24 anos", qual a % que usa 2FA?
 */
export function crossTabulateWithPercentages(
  participants: ParticipantAnswers[],
  rowQuestionId: string,
  colQuestionId: string
) {
  const counts = crossTabulate(participants, rowQuestionId, colQuestionId)

  const result: Record<
    string,
    Record<string, { count: number; percentage: number }>
  > = {}

  for (const rowKey of Object.keys(counts)) {
    const rowTotal = Object.values(counts[rowKey]).reduce(
      (acc, value) => acc + value,
      0
    )

    result[rowKey] = {}

    for (const colKey of Object.keys(counts[rowKey])) {
      const count = counts[rowKey][colKey]
      const percentage = rowTotal > 0 ? Math.round((count / rowTotal) * 100) : 0

      result[rowKey][colKey] = {
        count,
        percentage
      }
    }
  }

  return result
}