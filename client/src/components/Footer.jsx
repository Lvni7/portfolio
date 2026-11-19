// Année affichée dans le footer
const YEAR = new Date().getFullYear()

// Bas de la page
function Footer({ profile }) {
  const fullName = `${profile.first_name} ${profile.last_name}`

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        {profile.phone && <a href={`tel:${profile.phone}`}>{profile.phone}</a>}
        {profile.github_url && (
          <a href={profile.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
        {profile.linkedin_url && (
          <a href={profile.linkedin_url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}
        <span>
          © {YEAR} {fullName}
        </span>
      </div>

      {/* Juste décoratif donc caché aux lecteurs d'écran */}
      <p className="footer-name" aria-hidden="true">
        {fullName}
      </p>
    </footer>
  )
}

export default Footer
