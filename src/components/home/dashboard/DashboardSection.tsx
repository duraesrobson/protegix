import BarChartCard from "../../charts/BarChartCard"
import PieChartCard from "../../charts/PieChartCard"
import PiePaddingChartCard from "../../charts/PiePaddingChartCard"
import styles from "./DashboardSection.module.scss"
import LineChartCard from "../../charts/LineChartCard"
import { useTotalResponses } from "../../../hooks/useTotalResponses"

export default function DashboardSection() {
  const { totalRespostas, loading: loadingTotalRespostas } = useTotalResponses({
    perguntaId: "seg_navegacao"
  })
  return (
    <section id="dashboard" className={styles.dashboardSection}>
      <div className="container">
        {/* cabeçalho principal do dashboard */}
        <header className={`dashboardMainHeader ${styles.dashboardMainHeader}`}>
          <h1 className={`dashboardMainTitle ${styles.dashboardMainTitle}`}>
            Dashboard Protegix
          </h1>
          <p
            className={`dashboardMainSubtitle ${styles.dashboardMainSubtitle}`}
          >
            Acompanhe, de forma visual, os dados e padrões identificados a
            partir das respostas do formulário.
          </p>
          <p className={styles.totalRespostasText}>
            {loadingTotalRespostas
              ? "carregando..."
              : `Total de respostas atuais usadas para o dashboard: ${totalRespostas}`}
          </p>
        </header>

        {/* seção 1 - destaque / percepção */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Índice de Percepção de Segurança
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Como as pessoas se sentem:</span> Entendendo o nível de
              confiança de quem utiliza serviços digitais no dia a dia, desde
              bancos até redes sociais.
            </p>
          </header>

          <div className={styles.spotlightGrid}>
            <article className={styles.chartWrapper}>
              <LineChartCard
                titulo="Nível de Confiança em Serviços Digitais"
                ids={[
                  "seg_navegacao",
                  "seg_bancos",
                  "seg_redes",
                  "seg_compras",
                  "seg_email"
                ]}
                labels={["Navegação", "Bancos", "Redes", "Compras", "Email"]}
              />
            </article>
          </div>
        </section>

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 2 - higiene digital e incidentes */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Higiene Digital e Incidentes
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Cuidado e proteção:</span> Veja como os usuários protegem
              suas contas e descubra quantos já enfrentaram situações de risco
              ou golpes online.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Diversificação de Senhas entre Serviços"
                perguntaId="senhas_diferentes"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Adoção de Autenticação em Duas Etapas"
                perguntaId="2fa"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Incidência de Vítimas de Golpes Online"
                perguntaId="golpe"
              />
            </article>
          </div>
        </section>

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 3 - hábitos e dispositivos */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Hábitos e Dispositivos
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Tecnologia no dia a dia:</span> Saiba quais aparelhos as
              pessoas usam para se conectar e como elas cuidam da segurança e
              atualização de seus dispositivos.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Principal Dispositivo de Acesso à Internet"
                perguntaId="disp_principal"
              />
            </article>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Atualização de Dispositivos"
                perguntaId="disp_atualizacao"
              />
            </article>
          </div>
          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Verificação a segurança de sites antes de inserir dados pessoais"
                perguntaId="verifica_sites"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Qualidade da Internet"
                perguntaId="qualidade_internet"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Deixou de realizar alguma atividade por falta de acesso à tecnologia"
                perguntaId="falta_de_acesso"
              />
            </article>
          </div>
        </section>

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 4 - perfil do usuário */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>Perfil do Usuário</h2>
            <p className={styles.dashboardSectionDescription}>
              Quem são nossos participantes: Um olhar sobre as características
              de quem respondeu à pesquisa, ajudando a entender diferentes
              perfis de navegação.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Distribuição por Grupos de Idade"
                perguntaId="faixa_etaria"
              />
            </article>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Grau de Escolaridade"
                perguntaId="escolaridade"
              />
            </article>
          </div>
          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Exposição Diária à Rede"
                perguntaId="tempo_uso"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Tecnologias de Conexão Utilizadas"
                perguntaId="tipo_conexao"
              />
            </article>
          </div>
        </section>
      </div>
    </section>
  )
}
