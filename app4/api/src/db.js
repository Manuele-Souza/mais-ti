const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'passagens',
  password: process.env.DB_PASSWORD || 'abc123',
  database: process.env.DB_NAME || 'passagens',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = dbConfig;
