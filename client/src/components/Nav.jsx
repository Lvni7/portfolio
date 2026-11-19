import { useState } from 'react'

// Menu du haut
function Nav({ profile }) {
  // True quand le menu est ouvert
  const [isOpen, setIsOpen] = useState(false)

  // On ferme le menu après un clic sur un lien
  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <nav className="nav" aria-label="Menu principal">
      <a className="nav-logo" href="#top">
        {profile.first_name} {profile.last_name}
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Affiché seulement si le menu est ouvert */}
      {isOpen && (
        <div className="nav-menu">
          <a href="#projets" onClick={closeMenu}>
            Projets
          </a>
          <a href="#competences" onClick={closeMenu}>
            Compétences
          </a>
          <a href="#parcours" onClick={closeMenu}>
            Parcours
          </a>
          <a href="#contact" onClick={closeMenu}>
            Me contacter
          </a>
          {profile.cv && (
            <a href="/api/cv" onClick={closeMenu}>
              Télécharger mon CV
            </a>
          )}
        </div>
      )}
    </nav>
  )
}

export default Nav
