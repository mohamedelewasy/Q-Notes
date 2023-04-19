CREATE TABLE IF NOT EXISTS docs (
  id VARCHAR(256) PRIMARY KEY,
  pdf VARCHAR(256) UNIQUE NOT NULL ,
  thumbnail VARCHAR(256) UNIQUE ,
  description TEXT NOT NULL,
  "educationLevel" VARCHAR(32) NOT NULL,
  "className" NUMERIC NOT NULL,
  semester VARCHAR(32) NOT NULL,
  title VARCHAR(64) NOT NULL,
  "createdAt" Date NOT NULL,
  "updatedAt" Date NOT NULL
);