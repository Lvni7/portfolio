// Haut de la page
function Profile({ profile }) {
  // Profil encore vide
  if (!profile) {
    return <p>Profil à compléter.</p>
  }

  return (
    <header>
      <h1>
        {profile.first_name} {profile.last_name}
      </h1>
      <p>{profile.title}</p>
      <p>{profile.bio}</p>
      {/* Affiché seulement si la ville existe */}
      {profile.city && <p>{profile.city}</p>}
      {/* Lance le download du CV */}
      {profile.cv && <a href="/api/cv">Télécharger mon CV</a>}

      <ul>
        <li>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        {profile.phone && (
          <li>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          </li>
        )}
        {profile.github_url && (
          <li>
            <a href={profile.github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        )}
        {profile.linkedin_url && (
          <li>
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        )}
      </ul>
    </header>
  )
}

export default Profile
