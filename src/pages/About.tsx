import DashboardIcon from "@mui/icons-material/Dashboard"
import QuizIcon from "@mui/icons-material/Quiz"
import SchoolIcon from "@mui/icons-material/School"
import FeatureCard from "../components/about/FeatureCard"
import TeamMemberCard from "../components/about/TeamMemberCard"
import AppButton from "../components/ui/AppButton"
import styles from "./About.module.scss"

const ods = [
  {
    number: "ODS 4",
    title: "Educação de Qualidade",
    desc: "Fornece educação acessível sobre segurança digital para todos os públicos."
  },
  {
    number: "ODS 9",
    title: "Indústria e Inovação",
    desc: "Utiliza IA e tecnologia de ponta para conscientização."
  },
  {
    number: "ODS 16",
    title: "Paz e Justiça",
    desc: "Promove consciência crítica e segurança da informação."
  }
]

export default function AboutPage() {
  return (
    <section className={`${styles.pageSection} page-section`}>
      <div className="container">
        <div className={styles.hero}>
          <h1 className="section-title">O que é o Protegix?</h1>
          <p className="section-subtitle">
            Uma plataforma educacional gratuita desenvolvida por alunos de
            Ciência da Computação para conscientização sobre segurança digital.
            Promove conhecimento acessível para que todos possam navegar na
            internet com mais segurança.
          </p>
        </div>

        <div className={styles.aboutSection}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <h3>Sobre o Projeto</h3>
              <p>
                O Protegix é um projeto extensionista acadêmico desenvolvido no
                7º período do curso de Ciência da Computação na Universidade
                Iguaçu (UNIG).
              </p>
              <p>
                O objetivo principal é democratizar o acesso à informação sobre
                segurança digital, criando uma ferramenta que combine educação,
                análise de dados e gamificação para engajar os usuários de forma
                didática e interativa.
              </p>
              <p>
                Através de dashboards com dados reais, quizzes educativos e
                conteúdo acessível, buscamos formar cidadãos mais conscientes e
                preparados para enfrentar os desafios do ambiente digital.
              </p>
            </div>
            <div className={styles.aboutStats}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>7+</div>
                <span>Gráficos Interativos</span>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>30+</div>
                <span>Questões de Quiz</span>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>6+</div>
                <span>Dicas de Segurança</span>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>3</div>
                <span>ODS Contribuídos</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Funcionalidades</h2>
            <p>
              Uma plataforma completa com ferramentas para aprender e acompanhar
              o conhecimento sobre segurança digital.
            </p>
          </div>
          <div className={styles.featureGrid}>
            <FeatureCard
              icon={<DashboardIcon />}
              title="Dashboard de Dados"
              description="Visualização interativa de respostas em gráficos dinâmicos com insights gerados por IA."
            />
            <FeatureCard
              icon={<QuizIcon />}
              title="Quiz Interativo"
              description="30 perguntas com feedback imediato e um leaderboard gamificado para motivar o aprendizado."
            />
            <FeatureCard
              icon={<SchoolIcon />}
              title="Área Educacional"
              description="Dicas práticas, ameaças comuns e ações de proteção em conteúdo estruturado."
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Equipe</h2>
            <p>
              Conheça as mentes unidads pelo propósito de tornar
              a internet um lugar mais seguro para todos.
            </p>
          </div>
          <div className={styles.teamGrid}>
            <TeamMemberCard
              name="Matheus Britto"
              github="https://github.com/"
              linkedin="https://linkedin.com/in/"
            />
            <TeamMemberCard
              name="Mikaella Teixeira"
              github="https://github.com/Mikaella16"
              linkedin="https://linkedin.com/in/mikaella-teixeira"
              image="https://i.ibb.co/Lz0yvHRW/foto-mikaella.jpg"
            />
            <TeamMemberCard
              name="Robson Durães"
              github="https://github.com/duraesrobson"
              linkedin="https://linkedin.com/in/robson-duraes"
              image="https://github.com/duraesrobson.png"
            />
            <TeamMemberCard
              name="Salatiel Martins"
              github="https://github.com/tielmuzi"
              linkedin="https://linkedin.com/salatiel-muzi-martins"
              image="https://i.ibb.co/6R6hqKvz/foto-salatiel.jpg"
            />
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>Contribuição ODS</h2>
            <p>
              Alinhado aos Objetivos de Desenvolvimento Sustentável das Nações
              Unidas.
            </p>
          </div>
          <div className={styles.odsGrid}>
            {ods.map(ods => (
              <div key={ods.number} className={styles.odsCard}>
                <div className={styles.odsNumber}>{ods.number}</div>
                <h4>{ods.title}</h4>
                <p>{ods.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <div className={styles.ctaButtons}>
            <AppButton text="Ver Dashboard" to="/dashboard" />
            <AppButton
              text="Responder Pesquisa"
              to="https://forms.gle/frGUgTB2hHztENWFA"
              variant="secondary"
              newTab
            />
            <AppButton
              text="GitHub"
              to="https://github.com/duraesrobson/protegix"
              newTab
            />
          </div>
        </div>
      </div>
    </section>
  )
}
