import { useEffect, useState } from 'react'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Hero from './components/Hero.jsx'
import Nav from './components/Nav.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Statement from './components/Statement.jsx'
import Testimonials from './components/Testimonials.jsx'

// Call une route et récupère le JSON
async function getJson(url) {
  const response = await fetch(url)
  // On throw si le back répond une erreur
  if (!response.ok) throw new Error(`Erreur ${response.status}`)
  return response.json()
}

// Composant principal de la page
function App() {
  // Profil projets et compétences
  const [data, setData] = useState(null)
  // True si le chargement plante
  const [hasError, setHasError] = useState(false)

  // Run une seule fois à l'ouverture
  useEffect(() => {
    // Lance les 3 calls en même temps
    Promise.all([
      getJson('/api/profile'),
      getJson('/api/projects'),
      getJson('/api/skills'),
    ])
      .then(([profile, projects, skills]) => setData({ profile, projects, skills }))
      .catch(() => setHasError(true))
  }, [])

  // Ça a planté
  if (hasError) {
    return <p className="status-page">Le site est momentanément indisponible.</p>
  }

  // Pas encore chargé
  if (!data) {
    return <p className="status-page">Chargement…</p>
  }

  const { profile, projects, skills } = data

  // Profil encore vide
  if (!profile) {
    return <p className="status-page">Profil à compléter.</p>
  }

  // On passe les data en props
  return (
    <>
      <Nav profile={profile} />
      <main id="top">
        <Hero profile={profile} />
        <Statement />
        <Projects projects={projects.filter((item) => item.type === 'project')} />
        <Skills skills={skills} />
        <Testimonials />
        <About
          profile={profile}
          experiences={projects.filter((item) => item.type === 'experience')}
        />
        <Contact email={profile.email} />
      </main>
      <Footer profile={profile} />
    </>
  )
}

export default App
