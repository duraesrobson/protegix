import getThemeColor from "../../utils/getThemeColor"

export const chartPalette = [
  getThemeColor("--color-primary") || "#0ea5e9", // Azul Principal
  getThemeColor("--color-accent") || "#38bdf8", // Azul Claro
  "#10b981", // Esmeralda
  getThemeColor("--color-warning") || "#fbbf24", // Amarelo
  "#8b5cf6", // Violeta
  "#f43f5e", // Rose
  "#06b6d4", // Ciano
  getThemeColor("--color-primary-soft") || "#b6c5d8", // Azul Soft
  "#d946ef", // Fuchsia
  "#6366f1", // Indigo
  "#f97316", // Orange (extra)
  "#22d3ee" // Sky (extra)
]

// função para pegar a cor pelo index de forma segura
export const getColorByIndex = (index: number) =>
  chartPalette[index % chartPalette.length]
