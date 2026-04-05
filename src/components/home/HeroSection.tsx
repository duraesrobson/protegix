import AppButton from "../ui/AppButton"
import styles from "./HeroSection.module.scss"

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.blurEllipse} />
        <div className={styles.blurEllipse2} />
        <div className={styles.content}>
          <h1 className={styles.heroTitle}>
            Proteja sua vida digital com informação.
          </h1>
          <p className={styles.heroDescription}>
            Aprenda sobre segurança digital, conheça seus direitos, acompanhe
            dados da pesquisa e tome decisões mais seguras no ambiente online.
          </p>
          <div className={styles.heroButtons}>
            <AppButton text="Explorar dashboard" to="#dashboard" />
            <AppButton
              text="Participar da pesquisa"
              to="https://forms.gle/frGUgTB2hHztENWFA"
              variant="secondary"
              newTab
            />
            <AppButton text="Responder Quiz" to="/quiz" />
          </div>
        </div>
      </div>
    </section>
  )
}
