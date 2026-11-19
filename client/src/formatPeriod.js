// transforme la date en mois et année
function formatDate(date) {
  return new Date(date).toLocaleDateString('fr-FR', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// pas de date de fin donc c'est encore en cours
export function formatPeriod(start, end) {
  return `${formatDate(start)} - ${end ? formatDate(end) : "aujourd'hui"}`
}
