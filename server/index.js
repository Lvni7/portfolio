import express from 'express'
import mysql from 'mysql2/promise'

const app = express()

// Le pool garde quelques connexions MySQL ouvertes et les réutilise à chaque requête.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// Route de test : prouve que le serveur arrive à interroger MySQL.
app.get('/api/health', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT VERSION() AS version')
    res.json({ database: rows[0].version })
  } catch (error) {
    // Le détail reste dans le terminal, le visiteur n'a pas à le voir.
    console.error('Erreur MySQL :', error.code, error.message)
    res.status(500).json({ error: 'Base de données indisponible' })
  }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API lancée sur http://localhost:${port}`)
})
