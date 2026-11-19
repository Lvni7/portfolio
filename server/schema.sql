-- structure de la base reprise du MPD
-- on peut re-run ce fichier sans rien perdre

-- un seul profil possible
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

-- on store juste le hash du password
CREATE TABLE IF NOT EXISTS admin (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  profile_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);

-- projets et expériences dans la même table
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

-- messages du form de contact
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

-- les skills techniques ou transversales du profil
CREATE TABLE IF NOT EXISTS skill (
  skill_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  type ENUM('technical', 'soft') NOT NULL,
  profile_id INT NOT NULL,
  FOREIGN KEY (profile_id) REFERENCES profile (profile_id)
);

-- lien entre projets et skills
-- delete un projet ou un skill delete aussi ses liens
CREATE TABLE IF NOT EXISTS project_skill (
  project_id INT NOT NULL,
  skill_id INT NOT NULL,
  PRIMARY KEY (project_id, skill_id),
  FOREIGN KEY (project_id) REFERENCES project (project_id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skill (skill_id) ON DELETE CASCADE
);
