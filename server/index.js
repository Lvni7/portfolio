import path from 'node:path'
import express from 'express'
import mysql from 'mysql2/promise'
import { validateMessage } from './validateMessage.js'

// Notre serveur
const app = express()
// Dossier des fichiers uploadés
const uploadsDir = path.join(import.meta.dirname, 'uploads')
// Max de messages par heure
const MAX_MESSAGES_PER_HOUR = 20

// Récupère le JSON envoyé par le front
app.use(express.json({ limit: '32kb' }))
// Rend les images accessibles au front
app.use('/uploads', express.static(uploadsDir))

// Connexions MySQL prêtes à servir
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Évite les décalages de dates
  dateStrings: true,
})

// Route du profil
app.get('/api/profile', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM profile WHERE profile_id = 1')
  res.json(rows[0] ?? null)
})

// Route des projets du plus récent au plus ancien
app.get('/api/projects', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM project ORDER BY start_date DESC, project_id DESC',
  )
  // On ajoute les compétences de chaque projet
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

// Route des compétences
app.get('/api/skills', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM skill ORDER BY skill_id')
  res.json(rows)
})

// Route pour download le CV
app.get('/api/cv', async (req, res) => {
  const [rows] = await db.query('SELECT cv FROM profile WHERE profile_id = 1')
  const cv = rows[0]?.cv

  // Pas de CV en base
  if (!cv) {
    return res.status(404).json({ error: 'CV indisponible' })
  }
  // Root bloque tout accès hors du dossier uploads
  res.download(cv, 'Leni-Mette-CV.pdf', { root: uploadsDir })
})

// Route du form de contact
app.post('/api/messages', async (req, res) => {
  // Champ caché rempli donc c'est un bot
  // On fait semblant et on ne store rien
  if (req.body?.website) {
    return res.status(201).json({ ok: true })
  }

  // On check les données reçues
  const { message, error } = validateMessage(req.body)
  if (error) {
    return res.status(400).json({ error })
  }

  // Limite globale à passer par IP si on se fait spam
  const [[{ total }]] = await db.query(
    'SELECT COUNT(*) AS total FROM message WHERE sent_at > NOW() - INTERVAL 1 HOUR',
  )
  if (total >= MAX_MESSAGES_PER_HOUR) {
    return res
      .status(429)
      .json({ error: 'Trop de messages reçus, réessayez plus tard.' })
  }

  // Les ? bloquent les injections SQL
  await db.execute(
    'INSERT INTO message (name, email, subject, content, profile_id) VALUES (?, ?, ?, ?, 1)',
    [message.name, message.email, message.subject, message.content],
  )
  res.status(201).json({ ok: true })
})

// Si une route plante on arrive ici
// Le détail reste dans le terminal
app.use((error, req, res, next) => {
  // Réponse déjà partie
  if (res.headersSent) {
    return next(error)
  }
  // La requête est mauvaise
  if (error.status >= 400 && error.status < 500) {
    return res.status(error.status).json({ error: 'Requête invalide' })
  }
  console.error('Erreur serveur :', error.code, error.message)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

// On lance le serveur
const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API lancée sur http://localhost:${port}`)
})
