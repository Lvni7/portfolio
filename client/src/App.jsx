import { useEffect, useState } from 'react'

function App() {
  // Le state contient le texte affiché : quand il change, React met la page à jour.
  const [message, setMessage] = useState('Connexion en cours…')

  // Le tableau vide [] signifie : exécuter ce code une fois, à l'ouverture de la page.
  useEffect(() => {
    fetch('/api/health')
      .then((response) => {
        if (!response.ok) throw new Error('Réponse invalide')
        return response.json()
      })
      .then((data) => setMessage(`MySQL ${data.database} connecté`))
      .catch(() => setMessage('Base de données indisponible'))
  }, [])

  return (
    <main>
      <h1>Portfolio de Leni Mette</h1>
      <p>{message}</p>
    </main>
  )
}

export default App
