import BarChartCard from "../../charts/BarChartCard"
import PieChartCard from "../../charts/PieChartCard"
import PiePaddingChartCard from "../../charts/PiePaddingChartCard"
import styles from "./DashboardSection.module.scss"
import LineChartCard from "../../charts/LineChartCard"
import { useTotalResponses } from "../../../hooks/useTotalResponses"
import FeedbackListCard from "../../charts/FeedbackListCard"

export default function DashboardSection() {
  const { totalRespostas, loading: loadingTotalRespostas } = useTotalResponses({
    perguntaId: "seg_navegacao"
  })
  return (
    <section id="dashboard" className={styles.dashboardSection}>
      <div className="container">
        {/* cabeçalho principal do dashboard */}
        <header className={`section-header ${styles.dashboardMainHeader}`}>
          <h1 className={`section-title ${styles.dashboardMainTitle}`}>
            Dashboard Protegix
          </h1>
          <p className={`section-subtitle ${styles.dashboardMainSubtitle}`}>
            Acompanhe, de forma visual, os dados e padrões identificados a
            partir das respostas do formulário.
          </p>
          <p className={styles.dashboardMainSubtitle}>
            Este projeto contribui com os{" "}
            <b>Objetivos de Desenvolvimento Sustentável (ODS)</b>, especialmente
            a <b>ODS 16</b>, promovendo segurança digital e acesso consciente à
            informação.
          </p>
          <p className={styles.totalRespostasText}>
            {loadingTotalRespostas
              ? "carregando..."
              : `Total de respostas analisadas no dashboard: ${totalRespostas}`}
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
                labels={[
                  "Navegação",
                  "Bancos",
                  "Redes Sociais",
                  "Compras",
                  "Email"
                ]}
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
                titulo="Verificação da Segurança de Sites"
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
                titulo="Impacto da Falta de Acesso à Tecnologia"
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
              <span>Quem são nossos participantes:</span> Um olhar sobre as
              características de quem respondeu à pesquisa, ajudando a entender
              diferentes perfis de navegação.
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

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 5 - uso de ia */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Uso de IA Generativa
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Inovação e confiança:</span> Explore como a inteligência
              artificial está sendo integrada à rotina, a frequência de uso e o
              grau de verificação das informações geradas por essas ferramentas.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Uso de Ferramentas de IA Generativa"
                perguntaId="utiliza_ia"
              />
            </article>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Frequência de Uso de Ferramentas de IA"
                perguntaId="frequencia_ia"
              />
            </article>
          </div>
          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Finalidades de Uso da IA"
                perguntaId="finalidade_ia"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Confiança Nas Respostas de IA"
                perguntaId="confianca_ia"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PieChartCard
                titulo="Verificação de Respostas da IA"
                perguntaId="verificacao_ia"
              />
            </article>
          </div>
        </section>

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 6 - Proteção de Dados (LGPD) */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Proteção de Dados (LGPD)
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Privacidade e Direitos:</span> Entenda como os participantes
              percebem a proteção de seus dados pessoais, o nível de informação
              sobre a LGPD, práticas de consentimento e compartilhamento, além
              da confiança nas organizações que tratam essas informações.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Conhecimento Sobre a LGPD (Lei Geral de Proteção de Dados)"
                perguntaId="lgpd"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Nível de Conhecimento sobre Proteção de Dados"
                perguntaId="lgpd_nivel"
              />
            </article>
            <article className={styles.chartWrapper}>
              <PiePaddingChartCard
                titulo="Leitura de Termos de Uso e Políticas de Privacidade"
                perguntaId="lgpd_termos"
              />
            </article>
          </div>
          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <BarChartCard
                titulo="Impacto da Privacidade no Uso de Serviços"
                perguntaId="lgpd_uso"
              />
            </article>
          </div>
        </section>

        {/* separador */}
        <hr className={styles.sectionDivider} />

        {/* seção 7 - lista de feedback */}
        <section className={styles.dashboardContentSection}>
          <header className={styles.dashboardSectionHeader}>
            <h2 className={styles.dashboardSectionTitle}>
              Voz do Participante
            </h2>
            <p className={styles.dashboardSectionDescription}>
              <span>Opiniões e sugestões:</span> Confira o que pensam e as
              preocupações deixadas por quem participou da pesquisa.
            </p>
          </header>

          <div className={styles.chartsGrid}>
            <article className={styles.chartWrapper}>
              <FeedbackListCard
                titulo="Maiores Riscos Percebidos na Tecnologia"
                perguntaId="feedbacks"
              />
            </article>
          </div>
        </section>
      </div>
    </section>
  )
}
