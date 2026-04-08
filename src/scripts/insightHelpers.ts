export type FirestoreAnswer = {
  perguntaId?: string
  opcao?: string | number
  timestamp?: unknown
}

// Conta a frequência de cada opção de resposta para uma pergunta específica
export function countAnswers(
  docs: FirestoreAnswer[],
  perguntaId: string
): Record<string, number> {
  const counts: Record<string, number> = {}

  for (const item of docs) {
    // Filtra apenas as respostas que pertencem ao ID da pergunta solicitado
    if (item.perguntaId !== perguntaId) continue

    const raw = item.opcao
    if (raw === undefined || raw === null) continue

    // Normaliza a chave e incrementa o contador de ocorrências
    const key = String(raw).trim()
    counts[key] = (counts[key] || 0) + 1
  }

  return counts
}

// Calcula a média aritmética de respostas numéricas (ex: escalas de 1 a 5)
export function averageAnswers(
  docs: FirestoreAnswer[],
  perguntaId: string
): number | null {
  const values = docs
    // Filtra respostas da pergunta alvo
    .filter(item => item.perguntaId === perguntaId)
    .map(item => {
      const raw = String(item.opcao ?? "").trim()

      // Extrai o primeiro número encontrado na string da opção
      const match = raw.match(/\d+/)
      if (!match) return NaN

      return Number(match[0])
    })
    // Remove valores que não puderam ser convertidos em números
    .filter(value => !Number.isNaN(value))

  if (!values.length) return null

  // Soma os valores e retorna a média arredondada
  const total = values.reduce((acc, value) => acc + value, 0)
  return Math.round(total / values.length)
}
