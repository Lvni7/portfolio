import { formatPeriod } from '../formatPeriod.js'

// Présentation et expériences
function About({ profile, experiences }) {
  // Un paragraphe par ligne de la bio
  const paragraphs = profile.bio.split('\n')

  return (
    <section className="section about" id="parcours">
      {profile.photo && (
        <div className="about-photo">
          <img
            src={`/uploads/${profile.photo}`}
            alt=""
            width="1400"
            height="1400"
            loading="lazy"
          />
        </div>
      )}

      <div>
        <h2>
          Mon <em>parcours</em>
        </h2>

        {paragraphs.map((paragraph) => (
          <p className="about-text" key={paragraph}>
            {paragraph}
          </p>
        ))}

        {/* Le CV reste accessible direct ici et dans le menu */}
        {profile.cv && (
          <a className="button about-cv" href="/api/cv">
            Télécharger mon CV
          </a>
        )}

        <ol className="timeline">
          {experiences.map((experience) => (
            <li key={experience.project_id}>
              <p className="timeline-date">
                {formatPeriod(experience.start_date, experience.end_date)}
              </p>
              <div>
                <h3>{experience.title}</h3>
                <p className="timeline-place">{experience.organization}</p>
                <p>{experience.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default About
