import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env._DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool
