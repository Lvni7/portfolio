// Format simple d'un email
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Taille max de chaque champ
const MAX_LENGTHS = { name: 100, email: 255, subject: 150, content: 5000 }

// Enlève les espaces autour du texte
function clean(value) {
  return typeof value === 'string' ? value.trim() : ''
}

// On check tout côté back
// Return le message ou une erreur
export function validateMessage(body) {
  const message = {
    name: clean(body?.name),
    email: clean(body?.email),
    subject: clean(body?.subject),
    content: clean(body?.content),
  }

  const fields = Object.keys(MAX_LENGTHS)

  // Aucun champ vide
  if (fields.some((field) => message[field] === '')) {
    return { error: 'Tous les champs sont obligatoires.' }
  }
  // Aucun champ trop long
  if (fields.some((field) => message[field].length > MAX_LENGTHS[field])) {
    return { error: 'Un des champs est trop long.' }
  }
  // L'email doit être valide
  if (!EMAIL_FORMAT.test(message.email)) {
    return { error: "L'adresse email n'est pas valide." }
  }

  // Tout est good
  return { message }
}
