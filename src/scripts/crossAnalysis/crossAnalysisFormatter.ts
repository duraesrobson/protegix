import type { CrossAnalysisData, CrossAnalysisRow } from "../../types/crossAnalysisTypes"

type CrossTable = Record<
  string,
  Record<string, number | { count: number; percentage: number }>
>

type BuildCrossAnalysisParams = {
  id: string
  title: string
  rowLabel: string
  columnLabel: string
  data: CrossTable
}

export function buildCrossAnalysisTable({
  id,
  title,
  rowLabel,
  columnLabel,
  data
}: BuildCrossAnalysisParams): Omit<CrossAnalysisData, "insight"> {
  const columnSet = new Set<string>()

  for (const rowKey of Object.keys(data)) {
    for (const colKey of Object.keys(data[rowKey])) {
      columnSet.add(colKey)
    }
  }

  const columns = Array.from(columnSet)

  const rows: CrossAnalysisRow[] = Object.keys(data).map(rowKey => ({
    label: rowKey,
    values: data[rowKey]
  }))

  return {
    id,
    title,
    rowLabel,
    columnLabel,
    columns,
    rows
  }
}