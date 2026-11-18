// Transforme 2026-09-01 en « septembre 2026 ».
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

function ProjectList({ title, items }) {
  // Pas de section vide sur la page.
  if (items.length === 0) return null

  return (
    <section>
      <h2>{title}</h2>
      {/* key aide React à reconnaître chaque élément de la liste. */}
      {items.map((item) => (
        <article key={item.project_id}>
          <h3>{item.title}</h3>
          {item.organization && <p>{item.organization}</p>}
          {item.start_date && (
            <p>
              {formatDate(item.start_date)} –{' '}
              {item.end_date ? formatDate(item.end_date) : "aujourd'hui"}
            </p>
          )}
          <p>{item.description}</p>
          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer">
              Voir le projet
            </a>
          )}
        </article>
      ))}
    </section>
  )
}

function Projects({ projects }) {
  return (
    <>
      <ProjectList
        title="Projets"
        items={projects.filter((item) => item.type === 'project')}
      />
      <ProjectList
        title="Expériences"
        items={projects.filter((item) => item.type === 'experience')}
      />
    </>
  )
}

export default Projects
