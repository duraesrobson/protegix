import { useTotalResponses } from "../../../hooks/useTotalResponses"
import { useCrossAnalysis } from "../../../hooks/useCrossAnalysis"
import DashboardHeader from "./DashboardHeader"
import GeneralInsightSection from "./sections/GeneralInsightSection"
import CrossAnalysisSection from "./sections/CrossAnalysisSection"
import AIUsageSection from "./sections/AIUsageSection"
import LgpdSection from "./sections/LgpdSection"
import FeedbackSection from "./sections/FeedbackSection"
import SecurityPerceptionSection from "./sections/SecurityPerceptionSection"
import DigitalHygieneSection from "./sections/DigitalHygieneSection"
import HabitsDevicesSection from "./sections/HabitsDevicesSection"
import UserProfileSection from "./sections/UserProfileSection"
import styles from "./DashboardSection.module.scss"

export default function DashboardSection() {
  const {
    data: crossAnalysisData,
    loading: loadingCrossAnalysis,
    error: crossAnalysisError
  } = useCrossAnalysis()

  const { totalRespostas, loading: loadingTotalRespostas } = useTotalResponses({
    perguntaId: "seg_navegacao"
  })
  return (
    <section id="dashboard" className={styles.dashboardSection}>
      <div className="container">
        {/* header */}
        <DashboardHeader
          totalRespostas={totalRespostas}
          loadingTotalRespostas={loadingTotalRespostas}
        />

        {/* seção 1 - destaque / percepção */}
        <SecurityPerceptionSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 2 - higiene digital e incidentes */}
        <DigitalHygieneSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 3 - hábitos e dispositivos */}
        <HabitsDevicesSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 4 - perfil do usuário */}
        <UserProfileSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 5 - uso de ia */}
        <AIUsageSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 6 - Proteção de Dados (LGPD) */}
        <LgpdSection />

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 7 - lista de feedback */}
        <FeedbackSection />

        <hr className={styles.sectionDivider} />
        {/* seção 8 - Análise Geral dos Dados */}
        <GeneralInsightSection />

        <hr className={styles.sectionDivider} />

        {/* seção 9 - Cruzamento de Respostas */}
        <CrossAnalysisSection
          crossAnalysisData={crossAnalysisData}
          loadingCrossAnalysis={loadingCrossAnalysis}
          crossAnalysisError={crossAnalysisError}
        />
      </div>
    </section>
  )
}
