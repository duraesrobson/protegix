import admin from "firebase-admin"

// Trata a chave privada do Firebase para garantir que as quebras de linha (\n) sejam interpretadas corretamente
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

// Inicializa o SDK Admin do Firebase apenas se ainda não houver uma instância ativa
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey
    })
  })
}

// Exporta a instância do Firestore com privilégios administrativos
export const adminDb = admin.firestore()
// Exporta o módulo admin para uso de outras funcionalidades (como FieldValue)
export { admin }
