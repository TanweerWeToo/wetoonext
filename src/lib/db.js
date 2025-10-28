// MySQL Database Connection Utility
import mysql from 'mysql2/promise';

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'srv1875.hstgr.io',
  user: process.env.DB_USER || 'u181984996_adminwetoo',
  password: process.env.DB_PASSWORD || 'Admin@Wetoo123',
  database: process.env.DB_NAME || 'u181984996_adminwetoo',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Execute a query
export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Get a connection from the pool (for transactions)
export async function getConnection() {
  return await pool.getConnection();
}

export default pool;

