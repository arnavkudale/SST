import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Default XAMPP password is empty
  database: 'sst_website',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool; 