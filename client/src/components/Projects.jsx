// Transforme la date en mois et année
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// Bloc réutilisable pour une liste
function ProjectList({ title, items }) {
  // Rien à afficher si c'est vide
  if (items.length === 0) return null

  return (
    <section>
      <h2>{title}</h2>
      {/* Un article par élément */}
      {items.map((item) => (
        <article key={item.project_id}>
          <h3>{item.title}</h3>
          {item.organization && <p>{item.organization}</p>}
          {/* Sans date de fin c'est encore en cours */}
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

// Sépare les projets et les expériences
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
