import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          © {new Date().getFullYear()} Lanre Akomolafe. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
