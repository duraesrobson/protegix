"use strict"
import "dotenv/config"
import fs from "fs"
import path from "path"
import * as d3 from "d3"
import { adminDb } from "../lib/firebaseAdmin"
import {
  countAnswers,
  type FirestoreAnswer
} from "./insightHelpers"

const PERGUNTAS = [
  { id: "faixa_etaria", titulo: "Distribuição por Grupos de Idade" },
  { id: "escolaridade", titulo: "Grau de Escolaridade" },
  { id: "tempo_uso", titulo: "Exposição Diária à Rede" },
  { id: "tipo_conexao", titulo: "Tecnologias de Conexão Utilizadas" },
  { id: "senhas_diferentes", titulo: "Senhas Diferentes por Conta" },
  { id: "2fa", titulo: "Autenticação em Dois Fatores" },
  { id: "golpe", titulo: "Já Foi Vítima de Golpes" },
  { id: "disp_principal", titulo: "Principal Dispositivo de Acesso" },
  { id: "disp_atualizacao", titulo: "Atualização de Dispositivos" },
  { id: "verifica_sites", titulo: "Verificação da Segurança de Sites" },
  { id: "qualidade_internet", titulo: "Qualidade da Internet" },
  { id: "falta_de_acesso", titulo: "Impacto da Falta de Acesso" },
  { id: "lgpd", titulo: "Conhecimento sobre a LGPD" },
  { id: "lgpd_nivel", titulo: "Nível de Conhecimento LGPD" },
  { id: "lgpd_termos", titulo: "Leitura de Termos de Uso" },
  { id: "lgpd_uso", titulo: "Impacto da Privacidade no Uso de Serviços" },
  { id: "utiliza_ia", titulo: "Uso de Ferramentas de IA Generativa" },
  { id: "frequencia_ia", titulo: "Frequência de Uso de IA" },
  { id: "finalidade_ia", titulo: "Finalidades de Uso da IA" },
  { id: "confianca_ia", titulo: "Confiança nas Respostas de IA" },
  { id: "verificacao_ia", titulo: "Verificação de Respostas da IA" }
]

const PALETTE = [
  "#0ea5e9",
  "#10b981",
  "#fbbf24",
  "#8b5cf6",
  "#f43f5e",
  "#06b6d4",
  "#6366f1",
  "#f97316",
  "#22d3ee",
  "#ec4899",
  "#14b8a6",
  "#a855f7"
]

const WIDTH = 800
const HEIGHT = 500
const MARGIN = { top: 60, right: 30, bottom: 100, left: 60 }
const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right
const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom

type FirestoreDoc = FirestoreAnswer & { id: string }

function wrapLabel(text: string): string[] {
  const words = text.split(" ")
  if (words.length <= 2) return [text]

  const mid = Math.ceil(words.length / 2)
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")]
}

function generateBarChartSVG(
  data: { label: string; value: number }[],
  titulo: string
): string {
  const total = data.reduce((acc, d) => acc + d.value, 0)
  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = INNER_WIDTH / data.length
  const innerBarWidth = Math.min(barWidth * 0.65, 55)

  const yScale = d3.scaleLinear().domain([0, maxValue]).range([INNER_HEIGHT, 0])

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#ffffff"/>
  <text x="${WIDTH / 2}" y="35" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-size="16" font-weight="bold" fill="#111827">${titulo}</text>
  <g transform="translate(${MARGIN.left}, ${MARGIN.top})">`

  // Linhas de grade (Grid lines) - Renderizadas primeiro para ficarem atrás
  const yTicks = yScale.ticks(5)
  for (const tick of yTicks) {
    const y = yScale(tick)
    svg += `
    <line x1="0" y1="${y}" x2="${INNER_WIDTH}" y2="${y}" stroke="#e5e7eb" stroke-dasharray="2,2"/>
    <text x="-8" y="${y + 4}" text-anchor="end" font-family="Roboto, Arial, sans-serif" font-size="10" fill="#6b7280">${tick}</text>`
  }

  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    const x = (i + 0.5) * barWidth - innerBarWidth / 2
    const barHeight = INNER_HEIGHT - yScale(d.value)
    const y = yScale(d.value)
    const color = PALETTE[i % PALETTE.length]
    const percent = total > 0 ? Math.round((d.value / total) * 100) : 0

    svg += `
    <rect x="${x}" y="${y}" width="${innerBarWidth}" height="${barHeight}" fill="${color}" rx="2"/>
    <text x="${x + innerBarWidth / 2}" y="${y - 6}" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-size="11" font-weight="bold" fill="#374151">${percent}%</text>`
  }

  svg += `
    <line x1="0" y1="0" x2="0" y2="${INNER_HEIGHT}" stroke="#000000" stroke-width="1"/>`

  for (let i = 0; i < data.length; i++) {
    const d = data[i]
    const x = (i + 0.5) * barWidth
    const lines = wrapLabel(d.label)
    const startY = INNER_HEIGHT + 18

    for (let j = 0; j < lines.length; j++) {
      svg += `
    <text x="${x}" y="${startY + j * 13}" text-anchor="middle" font-family="Roboto, Arial, sans-serif" font-size="10" fill="#1f2937">${lines[j]}</text>`
    }
  }

  svg += `
  </g>
</svg>`

  return svg
}

async function exportCharts() {
  const snapshot = await adminDb.collection("respostas").get()

  const docs: FirestoreDoc[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as FirestoreAnswer)
  }))

  console.log(`Total de ${docs.length} respostas encontradas`)

  const outputDir = path.join(process.cwd(), "public", "docs", "graficos")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  for (const pergunta of PERGUNTAS) {
    console.log(`Processando: ${pergunta.id}`)

    const counts = countAnswers(docs, pergunta.id)

    if (Object.keys(counts).length === 0) {
      console.log(`  Nenhuma resposta encontrada para ${pergunta.id}`)
      continue
    }

    const data = Object.entries(counts)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => a.label.localeCompare(b.label))

    const svg = generateBarChartSVG(data, pergunta.titulo)

    fs.writeFileSync(path.join(outputDir, `${pergunta.id}.svg`), svg, "utf-8")

    console.log(`  Salvo: ${pergunta.id}.svg (${data.length} categorias)`)
  }

  console.log("\nExportação concluída!")
  console.log(`Arquivos salvos em: ${outputDir}`)
}

exportCharts().catch(error => {
  console.error("Erro ao exportar gráficos:", error)
  process.exit(1)
})
