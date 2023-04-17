CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(256) PRIMARY KEY,
  email VARCHAR(64) UNIQUE,
  "facebookId" VARCHAR(256),
  password VARCHAR(256),
  "isAdmin" BOOLEAN NOT NULL DEFAULT 'false',
  "isActive" BOOLEAN NOT NULL DEFAULT 'false',
  token TEXT,
  "verificationCode" VARCHAR(256),
  "createdAt" Date NOT NULL
);