import { useState } from 'react'

// form vide
const EMPTY_FORM = { name: '', email: '', subject: '', content: '', website: '' }

function Contact({ email }) {
  // ce que le user tape
  const [form, setForm] = useState(EMPTY_FORM)
  // true pendant l'envoi
  const [isSending, setIsSending] = useState(false)
  // message affiché après l'envoi
  const [feedback, setFeedback] = useState('')

  // update le champ modifié
  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  // run au clic sur Envoyer
  async function handleSubmit(event) {
    // évite le reload de la page
    event.preventDefault()
    setIsSending(true)
    setFeedback('')

    // message si ça fail
    let result = 'Envoi impossible, réessayez plus tard.'
    try {
      // call la route du back
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (response.ok) {
        // envoyé donc on reset le form
        setForm(EMPTY_FORM)
        result = 'Merci, votre message a bien été envoyé.'
      } else {
        // on affiche la raison du refus
        const data = await response.json()
        result = data.error ?? result
      }
    } catch {
      // le back répond pas
    }

    setFeedback(result)
    setIsSending(false)
  }

  return (
    <section className="contact" id="contact">
      <h2>
        Une idée ou un <em>stage</em> à proposer&nbsp;?
      </h2>
      <p className="contact-intro">
        Écrivez-moi ici ou à <a href={`mailto:${email}`}>{email}</a>
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
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

        {/* piège à bots caché */}
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

        {/* disabled pendant l'envoi */}
        <button className="button" type="submit" disabled={isSending}>
          {isSending ? 'Envoi…' : 'Envoyer'}
        </button>

        {/* lu par les screen readers */}
        <p role="status">{feedback}</p>
      </form>
    </section>
  )
}

export default Contact
