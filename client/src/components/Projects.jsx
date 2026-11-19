import { formatPeriod } from '../formatPeriod.js'

// Chiffres clés écrits ici car pas prévus dans le MPD
const STATS = {
  ConvoyDoc: [
    { value: '1062', label: 'comptes créés' },
    { value: 'iOS + Android', label: 'publiée sur l’App Store et Google Play' },
  ],
}

// Les chiffres clés d'un projet
function Stats({ stats }) {
  if (!stats) return null

  return (
    <dl className="project-stats">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt>{stat.label}</dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// Une carte projet
function ProjectCard({ project, featured }) {
  return (
    <article className={featured ? 'project project-featured' : 'project'}>
      {project.image && (
        <div className="project-frame">
          <img
            src={`/uploads/${project.image}`}
            alt={`Aperçu de ${project.title}`}
            width="1440"
            height="900"
            loading="lazy"
          />
        </div>
      )}

      <div className="project-body">
        <div className="project-head">
          <h3>{project.title}</h3>
          {project.start_date && (
            <p>{formatPeriod(project.start_date, project.end_date)}</p>
          )}
        </div>

        <p className="project-text">{project.description}</p>

        {/* Les compétences utilisées dans ce projet */}
        {project.skills?.length > 0 && (
          <ul className="project-skills">
            {project.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        )}

        <Stats stats={STATS[project.title]} />

        {project.url && (
          <a
            className="project-link"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Voir ${project.title}`}
          >
            Voir le projet
          </a>
        )}
      </div>
    </article>
  )
}

// Le premier projet en grand puis les autres en grille
function Projects({ projects }) {
  // Rien à afficher si c'est vide
  if (projects.length === 0) return null

  const [featured, ...others] = projects

  return (
    <section className="section" id="projets">
      <h2>
        Mes <em>projets</em>
      </h2>

      <ProjectCard project={featured} featured />

      <div className="project-grid">
        {others.map((project) => (
          <ProjectCard key={project.project_id} project={project} />
        ))}
      </div>

      {/* Pour dire que la liste n'est pas complète */}
      <div className="project-more">
        <p>Et bien plus encore…</p>
        <a className="button button-outline" href="#contact">
          Parlons du vôtre
        </a>
      </div>
    </section>
  )
}

export default Projects
