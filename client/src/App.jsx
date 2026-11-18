import { useEffect, useState } from 'react'
import Contact from './components/Contact.jsx'
import Profile from './components/Profile.jsx'
import Projects from './components/Projects.jsx'

// Call une route et récupère le JSON
async function getJson(url) {
  const response = await fetch(url)
  // On throw si le back répond une erreur
  if (!response.ok) throw new Error(`Erreur ${response.status}`)
  return response.json()
}

// Composant principal de la page
function App() {
  // Profil et projets
  const [data, setData] = useState(null)
  // True si le chargement plante
  const [hasError, setHasError] = useState(false)

  // Run une seule fois à l'ouverture
  useEffect(() => {
    // Lance les 2 calls en même temps
    Promise.all([getJson('/api/profile'), getJson('/api/projects')])
      .then(([profile, projects]) => setData({ profile, projects }))
      .catch(() => setHasError(true))
  }, [])

  // Ça a planté
  if (hasError) {
    return (
      <main>
        <p>Le site est momentanément indisponible.</p>
      </main>
    )
  }

  // Pas encore chargé
  if (!data) {
    return (
      <main>
        <p>Chargement…</p>
      </main>
    )
  }

  // On passe les data en props
  return (
    <main>
      <Profile profile={data.profile} />
      <Projects projects={data.projects} />
      <Contact />
    </main>
  )
}

export default App
