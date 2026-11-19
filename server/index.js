import path from 'node:path'
import express from 'express'
import mysql from 'mysql2/promise'
import { validateMessage } from './validateMessage.js'

// notre server
const app = express()
// le dossier des uploads
const uploadsDir = path.join(import.meta.dirname, 'uploads')
// max de messages par heure
const MAX_MESSAGES_PER_HOUR = 20

// parse le JSON envoyé par le front
app.use(express.json({ limit: '32kb' }))
// expose les images au front
app.use('/uploads', express.static(uploadsDir))

// pool de connexions MySQL ready
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // évite les bugs de dates
  dateStrings: true,
})

// get le profil
app.get('/api/profile', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM profile WHERE profile_id = 1')
  res.json(rows[0] ?? null)
})

// get les projets du plus récent au plus ancien
app.get('/api/projects', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM project ORDER BY start_date DESC, project_id DESC',
  )
  // on add les skills de chaque projet
  const [links] = await db.query(
    'SELECT ps.project_id, s.name FROM project_skill ps JOIN skill s ON s.skill_id = ps.skill_id ORDER BY s.skill_id',
  )
  for (const project of rows) {
    project.skills = links
      .filter((link) => link.project_id === project.project_id)
      .map((link) => link.name)
  }
  res.json(rows)
})

// get les skills
app.get('/api/skills', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM skill ORDER BY skill_id')
  res.json(rows)
})

// download le CV
app.get('/api/cv', async (req, res) => {
  const [rows] = await db.query('SELECT cv FROM profile WHERE profile_id = 1')
  const cv = rows[0]?.cv

  // pas de CV en base
  if (!cv) {
    return res.status(404).json({ error: 'CV indisponible' })
  }
  // root bloque tout accès hors des uploads
  res.download(cv, 'Leni-Mette-CV.pdf', { root: uploadsDir })
})

// le form de contact
app.post('/api/messages', async (req, res) => {
  // champ caché rempli donc c'est un bot
  // on fake le succès et on store rien
  if (req.body?.website) {
    return res.status(201).json({ ok: true })
  }

  // on check les data reçues
  const { message, error } = validateMessage(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  // limite globale à passer par IP si on se fait spam
  const [[{ total }]] = await db.query(
    'SELECT COUNT(*) AS total FROM message WHERE sent_at > NOW() - INTERVAL 1 HOUR',
  )
  if (total >= MAX_MESSAGES_PER_HOUR) {
    return res
      .status(429)
      .json({ error: 'Trop de messages reçus, réessayez plus tard.' })
  }

  // les ? bloquent les injections SQL
  await db.execute(
    'INSERT INTO message (name, email, subject, content, profile_id) VALUES (?, ?, ?, ?, 1)',
    [message.name, message.email, message.subject, message.content],
  )
  res.status(201).json({ ok: true })
})

// si une route crash on arrive ici
// le détail reste dans le terminal
app.use((error, req, res, next) => {
  // réponse déjà envoyée
  if (res.headersSent) {
    return next(error)
  }
  // bad request côté user
  if (error.status >= 400 && error.status < 500) {
    return res.status(error.status).json({ error: 'Requête invalide' })
  }
  console.error('Erreur serveur :', error.code, error.message)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

// on run le server
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API lancée sur http://localhost:${port}`)
})
