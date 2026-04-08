import { admin, adminDb } from "../lib/firebaseAdmin"

// Busca metadados sobre a última análise de insights realizada
export async function getInsightMeta() {
  // Acessa o documento de controle na coleção 'system'
  const snapshot = await adminDb.collection("system").doc("insight_meta").get()

  // Retorna valor zerado caso o documento ainda não exista
  if (!snapshot.exists) {
    return {
      lastAnalyzedParticipants: 0
    }
  }

  const data = snapshot.data()

  // Retorna a quantidade de participantes processada na última execução
  return {
    lastAnalyzedParticipants: data?.lastAnalyzedParticipants ?? 0
  }
}

// Atualiza os metadados após a geração de um novo insight
export async function saveInsightMeta(totalParticipantes: number) {
  // Salva o novo total e o timestamp da execução atual
  await adminDb.collection("system").doc("insight_meta").set({
    lastAnalyzedParticipants: totalParticipantes,
    lastRunAt: admin.firestore.FieldValue.serverTimestamp()
  })
}