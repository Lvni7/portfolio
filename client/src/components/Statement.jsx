import { FlashIcon } from 'hugeicons-react'

// mes services autour de la phrase comme sur l'inspi
const LEFT_PILLS = ['SaaS', 'Applis mobiles', 'Sites web']
const RIGHT_PILLS = ['Logiciels métier', 'Outils IA', 'Automatisation']

// une colonne de bulles
function Pills({ items, side }) {
  return (
    <ul className={`statement-pills statement-pills-${side}`}>
      {items.map((item) => (
        <li key={item}>
          <span className="statement-icon">
            <FlashIcon size={18} aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  )
}

// la grande phrase qui explique ce que je fais
function Statement() {
  return (
    <section className="statement">
      <Pills items={LEFT_PILLS} side="left" />

      <div className="statement-center">
        <p className="statement-label">Bonjour !</p>
        <p className="statement-text">
          Je construis votre SaaS, appli mobile, site web ou logiciels métier{' '}
          {/* le résultat à la ligne avec le gain en rouge */}
          <span className="statement-result">
            pour que votre activité gagne{' '}
            <strong>des clients, de l’argent et du temps.</strong>
          </span>
        </p>
      </div>

      <Pills items={RIGHT_PILLS} side="right" />
    </section>
  )
}

export default Statement
