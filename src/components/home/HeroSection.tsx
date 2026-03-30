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
            Aprenda sobre segurança digital, conheça seus direitos e tome
            decisões mais seguras no ambiente online.
          </p>
          <div className={styles.heroButtons}>
            <AppButton text="Ver dashboard" to="#dashboard" />
            <AppButton text="Fazer quiz" to="/quiz" variant="secondary" />
          </div>
        </div>
      </div>
    </section>
  )
}
