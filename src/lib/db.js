import { Pool } from 'pg'

let pool = null

function createPool() {
  if (pool) {
    return pool
  }

  const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 5432,
    ssl: {
      rejectUnauthorized: false,
    },
    // Connection timeout settings for AWS Lambda
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 1, // Maximum number of clients in the pool for serverless
  }

  console.log('Creating database pool with config:', {
    user: config.user,
    host: config.host,
    database: config.database,
    port: config.port,
    // Don't log password for security
  })

  pool = new Pool(config)

  // Handle pool errors
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    pool = null // Reset pool on error
  })

  return pool
}

export default createPool()
