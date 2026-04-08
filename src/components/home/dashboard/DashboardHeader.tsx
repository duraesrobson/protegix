import styles from "./DashboardSection.module.scss"

type DashboardHeaderProps = {
  totalRespostas: number
  loadingTotalRespostas: boolean
}

export default function DashboardHeader({
  totalRespostas,
  loadingTotalRespostas
}: DashboardHeaderProps) {
  return (
    <header className={`section-header ${styles.dashboardMainHeader}`}>
      <h1 className={`section-title ${styles.dashboardMainTitle}`}>
        Dashboard Protegix
      </h1>

      <p className={`section-subtitle ${styles.dashboardMainSubtitle}`}>
        Acompanhe, de forma visual, os dados e padrões identificados a partir
        das respostas do formulário.
      </p>

      <p className={styles.dashboardMainSubtitle}>
        Este projeto contribui com os{" "}
        <b>Objetivos de Desenvolvimento Sustentável (ODS)</b>, especialmente as{" "}
        <b>ODS 4, 9 e 16</b>, ao promover educação em segurança digital, uso da
        tecnologia para conscientização e análise de dados, além de incentivar o
        acesso consciente à informação e a proteção no ambiente digital.
      </p>

      <p className={styles.totalRespostasText}>
        {loadingTotalRespostas
          ? "carregando..."
          : `Total de respostas analisadas no dashboard: ${totalRespostas}`}
      </p>
    </header>
  )
}