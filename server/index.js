import express from 'express'
import mysql from 'mysql2/promise'

const app = express()

// Le pool garde quelques connexions MySQL ouvertes et les réutilise à chaque requête.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // Garde les dates en texte (2026-09-01) pour éviter les décalages de fuseau horaire.
  dateStrings: true,
})

// Route de test : prouve que le serveur arrive à interroger MySQL.
app.get('/api/health', async (req, res) => {
  const [rows] = await db.query('SELECT VERSION() AS version')
  res.json({ database: rows[0].version })
})

// Renvoie le profil, ou null s'il n'a pas encore été rempli.
app.get('/api/profile', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM profile WHERE profile_id = 1')
  res.json(rows[0] ?? null)
})

// Renvoie les projets et les expériences, du plus récent au plus ancien.
app.get('/api/projects', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM project ORDER BY start_date DESC, project_id DESC',
  )
  res.json(rows)
})

// Express envoie ici toute erreur survenue dans une route.
// Le détail reste dans le terminal, le visiteur n'a pas à le voir.
app.use((error, req, res, next) => {
  console.error('Erreur serveur :', error.code, error.message)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API lancée sur http://localhost:${port}`)
})
