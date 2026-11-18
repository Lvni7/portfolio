-- Structure de la base, d'après le MPD.
-- IF NOT EXISTS : relancer ce fichier ne modifie pas les tables existantes
-- et n'efface aucune donnée.
-- Les tables skill et project_skill seront ajoutées après l'atelier.

-- Le site présente une seule personne : le CHECK interdit un deuxième profil.
CREATE TABLE IF NOT EXISTS profile (
  profile_id INT PRIMARY KEY DEFAULT 1 CHECK (profile_id = 1),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  title VARCHAR(100) NOT NULL,
  bio TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NULL,
  city VARCHAR(100) NULL,
  photo VARCHAR(255) NULL,
  cv VARCHAR(255) NULL,
  github_url VARCHAR(255) NULL,
  linkedin_url VARCHAR(255) NULL
);

-- On stocke uniquement le hash du mot de passe, jamais le mot de passe lui-même.
CREATE TABLE IF NOT EXISTS admin (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  profile_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);

-- Une même table regroupe les projets et les expériences, distingués par type.
CREATE TABLE IF NOT EXISTS project (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('project', 'experience') NOT NULL,
  organization VARCHAR(150) NULL,
  url VARCHAR(255) NULL,
  image VARCHAR(255) NULL,
  start_date DATE NULL,
  end_date DATE NULL,
  profile_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);

-- Messages reçus par le formulaire de contact.
CREATE TABLE IF NOT EXISTS message (
  message_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  sent_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  profile_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);
