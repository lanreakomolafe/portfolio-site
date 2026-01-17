import Layout from '../components/Layout'
import EmailForm from '../components/EmailForm'
import styles from '../styles/Projects.module.css'

interface Project {
  title: string
  description: string
  technologies: string[]
  isPlaceholder?: boolean
}

const projects: Project[] = [
  {
    title: 'Project Title — Placeholder',
    description: 'This is a placeholder project description. Replace with actual project details, including the problem solved, approach taken, and outcomes achieved.',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    isPlaceholder: true,
  },
  {
    title: 'Project Title — Placeholder',
    description: 'Another placeholder project. Include key features, technical challenges, and impact when updating with real project information.',
    technologies: ['Next.js', 'TypeScript', 'AWS'],
    isPlaceholder: true,
  },
  {
    title: 'Project Title — Placeholder',
    description: 'Placeholder for a third project. Describe the architecture, scale, and business value delivered.',
    technologies: ['Python', 'FastAPI', 'Docker'],
    isPlaceholder: true,
  },
]

export default function Projects() {
  return (
    <Layout
      title="Projects"
      description="Selected projects and work highlights by Lanre Akomolafe"
    >
      <div className={styles.projects}>
        <div className="container">
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.intro}>
            A selection of projects I've worked on. Each represents a unique challenge 
            and learning opportunity.
          </p>

          <div className={styles.grid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.card}>
                {project.isPlaceholder && (
                  <span className={styles.placeholderBadge}>Placeholder</span>
                )}
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardDescription}>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className={styles.ctaSection}>
            <h2 className={styles.ctaHeading}>Interested in My Work?</h2>
            <p className={styles.ctaText}>
              Join my newsletter to get updates on new projects and insights.
            </p>
            <EmailForm sourcePage="projects" />
          </section>
        </div>
      </div>
    </Layout>
  )
}
