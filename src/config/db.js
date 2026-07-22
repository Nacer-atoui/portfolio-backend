import mysql from 'mysql2/promise';

// 1. On prépare la configuration de base
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10 // En local, on peut être généreux
};

// 2. On ajoute le SSL uniquement si la variable d'environnement le demande
if (process.env.DB_SSL === 'true') {
  dbConfig.ssl = { rejectUnauthorized: false };
}

// 3. On crée le pool
const pool = mysql.createPool(dbConfig);

export default pool;