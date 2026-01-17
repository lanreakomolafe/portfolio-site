import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Lanre Akomolafe - Full-stack engineer and technology leader"
    >
      <div className={styles.hero}>
        <div className="container">
          <h1 className={styles.headline}>Lanre Akomolafe</h1>
          <p className={styles.subheadline}>
            I build products, lead engineering teams, and help companies scale their technology infrastructure.
          </p>
          <p className={styles.description}>
            Full-stack engineer with a passion for clean code, thoughtful architecture, and delivering value.
          </p>
        </div>
      </div>

      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaHeading}>Join My Weekly Newsletter</h2>
          <p className={styles.ctaText}>
            Get insights on engineering, product development, and building scalable systems.
          </p>
          <EmailForm sourcePage="home" />
        </div>
      </section>
    </Layout>
  )
}
