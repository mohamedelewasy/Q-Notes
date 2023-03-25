CREATE TABLE IF NOT EXISTS docs (
  id VARCHAR(256) PRIMARY KEY,
  pdf VARCHAR(256) UNIQUE NOT NULL ,
  description TEXT NOT NULL,
  "educationLevel" VARCHAR(32) NOT NULL,
  "className" VARCHAR(32) NOT NULL,
  semester VARCHAR(32) NOT NULL,
  title VARCHAR(64) NOT NULL,
  price NUMERIC (5,2) NOT NULL,
  "createdAt" Date NOT NULL,
  "updatedAt" Date NOT NULL
);