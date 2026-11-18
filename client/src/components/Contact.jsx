import { useState } from 'react'

// Form vide
const EMPTY_FORM = { name: '', email: '', subject: '', content: '', website: '' }

function Contact() {
  // Ce que le user tape
  const [form, setForm] = useState(EMPTY_FORM)
  // True pendant l'envoi
  const [isSending, setIsSending] = useState(false)
  // Message affiché après l'envoi
  const [feedback, setFeedback] = useState('')

  // Update le champ modifié
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // Lancé au clic sur Envoyer
  async function handleSubmit(event) {
    // Évite de recharger la page
    event.preventDefault()
    setIsSending(true)
    setFeedback('')

    // Message si ça se passe mal
    let result = 'Envoi impossible, réessayez plus tard.'
    try {
      // Call la route du back
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        // Envoyé donc on vide le form
        setForm(EMPTY_FORM)
        result = 'Merci, votre message a bien été envoyé.'
      } else {
        // On affiche la raison du refus
        const data = await response.json()
        result = data.error ?? result
      }
    } catch {
      // Le back ne répond pas
    }

    setFeedback(result)
    setIsSending(false)
  }

  return (
    <section>
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nom
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            maxLength={100}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            maxLength={255}
            required
          />
        </label>

        <label>
          Sujet
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            maxLength={150}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
            maxLength={5000}
            required
          />
        </label>

        {/* Piège à bots caché */}
        <div className="honeypot" aria-hidden="true">
          <label>
            Site web
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        {/* Bloqué pendant l'envoi */}
        <button type="submit" disabled={isSending}>
          {isSending ? 'Envoi…' : 'Envoyer'}
        </button>

        {/* Lu par les lecteurs d'écran */}
        <p role="status">{feedback}</p>
      </form>
    </section>
  )
}

export default Contact
