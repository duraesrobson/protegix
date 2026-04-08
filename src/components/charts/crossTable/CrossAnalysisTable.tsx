import type { CrossAnalysisDoc, CrossAnalysisCell } from "../../../types/crossAnalysisTypes"
import styles from "./CrossAnalysisTable.module.scss"

type CrossAnalysisTableProps = {
  data: CrossAnalysisDoc
}

function formatCellValue(value: CrossAnalysisCell | undefined) {
  if (value === undefined) return "-"

  if (typeof value === "number") {
    return value
  }

  return `${value.count} (${value.percentage}%)`
}

export default function CrossAnalysisTable({
  data
}: CrossAnalysisTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{data.rowLabel}</th>
            {data.columns.map(column => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.rows.map(row => (
            <tr key={row.label}>
              <td className={styles.rowLabel}>{row.label}</td>

              {data.columns.map(column => (
                <td key={column}>{formatCellValue(row.values[column])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}