function Profile({ profile }) {
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
      {profile.city && <p>{profile.city}</p>}

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
