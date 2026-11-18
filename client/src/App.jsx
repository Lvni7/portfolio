import { useEffect, useState } from 'react'
import Profile from './components/Profile.jsx'
import Projects from './components/Projects.jsx'

// Appelle une route de l'API et renvoie sa réponse JSON.
async function getJson(url) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Erreur ${response.status}`)
  return response.json()
}

function App() {
  const [data, setData] = useState(null)
  const [hasError, setHasError] = useState(false)

  // Le tableau vide [] signifie : exécuter ce code une fois, à l'ouverture de la page.
  useEffect(() => {
    Promise.all([getJson('/api/profile'), getJson('/api/projects')])
      .then(([profile, projects]) => setData({ profile, projects }))
      .catch(() => setHasError(true))
  }, [])

  if (hasError) {
    return (
      <main>
        <p>Le site est momentanément indisponible.</p>
      </main>
    )
  }

  if (!data) {
    return (
      <main>
        <p>Chargement…</p>
      </main>
    )
  }

  // Les données sont transmises aux composants par leurs props.
  return (
    <main>
      <Profile profile={data.profile} />
      <Projects projects={data.projects} />
    </main>
  )
}

export default App
