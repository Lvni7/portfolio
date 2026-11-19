// vrais avis avec leur source
const TESTIMONIALS = [
  {
    quote:
      'Vous avez été formidable du début à la fin. Votre réactivité, votre sérieux, votre écoute […] ont vraiment fait la différence. Le site est vraiment top, je suis ravie !',
    name: 'Malesherbes Autotech',
    role: 'Cliente pour la création du site',
    source: 'Message client',
    initials: 'MA',
  },
  {
    quote:
      'Leni a su très rapidement comprendre le fonctionnement de notre service, ses enjeux et ses outils. J’ai particulièrement apprécié sa curiosité, son autonomie et sa capacité à transformer une idée en un projet concret.',
    name: 'Damien Feuillet',
    role: 'Chef du pôle informatique, INSEP',
    source: 'Recommandation LinkedIn',
    initials: 'DF',
  },
]

// ce que les gens disent de mon taff
function Testimonials() {
  return (
    <section className="section testimonials">
      <h2>
        Ils en <em>parlent</em>
      </h2>

      <div className="testimonial-list">
        {TESTIMONIALS.map((item) => (
          <figure className="testimonial" key={item.name}>
            <span className="testimonial-mark" aria-hidden="true">
              ”
            </span>
            <blockquote>{item.quote}</blockquote>
            <figcaption>
              <span className="testimonial-avatar" aria-hidden="true">
                {item.initials}
              </span>
              <span>
                <strong>{item.name}</strong>
                <span className="testimonial-role">
                  {item.role} · {item.source}
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
