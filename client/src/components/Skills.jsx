// un groupe de skills en bulles
function SkillGroup({ title, items, soft }) {
  // rien à afficher si c'est vide
  if (items.length === 0) return null

  return (
    <div className="skill-group">
      <h3>{title}</h3>
      <ul className={soft ? 'skill-list skill-list-soft' : 'skill-list'}>
        {items.map((skill) => (
          <li key={skill.skill_id}>{skill.name}</li>
        ))}
      </ul>
    </div>
  )
}

// mes skills techniques et transversales
function Skills({ skills }) {
  if (skills.length === 0) return null

  return (
    <section className="section" id="competences">
      <h2>
        Mes <em>compétences</em>
      </h2>

      <div className="skill-groups">
        <SkillGroup
          title="Techniques"
          items={skills.filter((skill) => skill.type === 'technical')}
        />
        <SkillGroup
          title="Transversales"
          items={skills.filter((skill) => skill.type === 'soft')}
          soft
        />
      </div>
    </section>
  )
}

export default Skills
