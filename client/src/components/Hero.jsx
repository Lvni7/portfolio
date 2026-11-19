import { LaurelWreathLeft01Icon, LaurelWreathRight01Icon } from 'hugeicons-react'

// Haut de la page
function Hero({ profile }) {
  // Les versions avec halo et détourée de la photo
  const glowPhoto = profile.photo?.replace(/\.\w+$/, '-glow.webp')
  const cutPhoto = profile.photo?.replace(/\.\w+$/, '-cut.webp')

  return (
    <section className="hero">
      <p className="hero-proof">
        {/* Le chiffre entre deux branches de laurier */}
        <span className="hero-laurel">
          <LaurelWreathLeft01Icon size={40} strokeWidth={1.5} aria-hidden="true" />
          <strong>+10</strong>
          <LaurelWreathRight01Icon size={40} strokeWidth={1.5} aria-hidden="true" />
        </span>
        projets réalisés
      </p>

      <h1 className="hero-title">
        {/* Le nom en grand pour le personal branding */}
        <span>
          {profile.first_name} {profile.last_name}
        </span>
        <em>{profile.title}</em>
      </h1>

      <p className="hero-badge">
        <span className="hero-badge-text">
          <strong>Recherche un stage de 4 mois</strong>
          <span className="hero-badge-dates">D’avril à juillet 2027</span>
        </span>
      </p>

      {/* Le halo passe derrière le titre et la tête détourée devant */}
      {profile.photo && (
        <div className="hero-visual">
          <img
            className="hero-photo"
            src={`/uploads/${glowPhoto}`}
            alt={`Portrait de ${profile.first_name} ${profile.last_name}`}
            width="1400"
            height="1400"
            onError={(event) => {
              // Pas de version avec halo donc on prend la photo normale
              event.currentTarget.onerror = null
              event.currentTarget.src = `/uploads/${profile.photo}`
            }}
          />
          <img
            className="hero-photo hero-photo-cut"
            src={`/uploads/${cutPhoto}`}
            alt=""
            width="1400"
            height="1400"
            onError={(event) => {
              // Pas de version détourée donc on la cache
              event.currentTarget.hidden = true
            }}
          />
        </div>
      )}


      {/* Chiffre réel de ConvoyDoc */}
      <p className="hero-trust">
        <img src="/convoydoc.webp" alt="" width="40" height="40" />
        <span>
          Déjà <strong>1062 comptes</strong> créés sur ConvoyDoc, mon app pour les
          convoyeurs automobiles.
        </span>
      </p>

      <a className="button hero-contact" href="#contact">
        <span aria-hidden="true">→</span>
        Me contacter
      </a>
    </section>
  )
}

export default Hero
