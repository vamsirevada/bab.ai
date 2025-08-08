import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.REACT_APP_DB_URL, // Use the connection URL from the environment variable
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool
