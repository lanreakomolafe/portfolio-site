import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import styles from '../styles/About.module.css'

export default function About() {
  return (
    <Layout
      title="About"
      description="Learn more about Lanre Akomolafe - background, experience, and career highlights"
    >
      <div className={styles.about}>
        <div className="container">
          <h1 className={styles.title}>About</h1>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Professional Summary</h2>
            <p className={styles.text}>
              I'm a full-stack engineer and technology leader with extensive experience building 
              scalable web applications and leading engineering teams. I specialize in modern 
              web technologies, cloud infrastructure, and product development.
            </p>
            <p className={styles.text}>
              My approach combines technical excellence with a focus on delivering real business 
              value. I believe in clean code, thoughtful architecture, and building systems that 
              are both powerful and maintainable.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Background</h2>
            <p className={styles.text}>
              {/* Placeholder content - to be updated with actual LinkedIn profile information */}
              With a strong foundation in computer science and years of hands-on experience, 
              I've worked across various industries helping companies build and scale their 
              technology platforms.
            </p>
            <p className={styles.text}>
              I'm passionate about continuous learning, sharing knowledge, and contributing 
              to the engineering community through writing, speaking, and mentorship.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Career Highlights</h2>
            <ul className={styles.highlights}>
              <li>Led engineering teams to deliver high-impact products</li>
              <li>Architected and built scalable systems handling millions of users</li>
              <li>Mentored developers and contributed to engineering culture</li>
              <li>Delivered projects across multiple technology stacks</li>
            </ul>
          </section>

          <section className={styles.ctaSection}>
            <h2 className={styles.ctaHeading}>Stay Connected</h2>
            <p className={styles.ctaText}>
              Want to learn more about my work and insights? Join my weekly newsletter.
            </p>
            <EmailForm sourcePage="about" />
          </section>
        </div>
      </div>
    </Layout>
  )
}
