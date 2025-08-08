import { Pool } from 'pg'

let pool = null

function createPool() {
  if (pool) {
    return pool
  }

  // Log all environment variables for debugging
  console.log('Environment Variables Check:', {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL ? 'SET' : 'MISSING',
    DB_HOST: process.env.DB_HOST || 'MISSING',
    DB_USER: process.env.DB_USER || 'MISSING',
    DB_NAME: process.env.DB_NAME || 'MISSING',
    DB_PORT: process.env.DB_PORT || 'MISSING',
    DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING',
  })

  let config

  // Try DB_URL first, then fall back to individual variables
  if (process.env.DB_URL) {
    config = {
      connectionString: process.env.DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    }
    console.log('Using DB_URL connection')
  } else if (process.env.DB_HOST) {
    config = {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT) || 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    }
    console.log('Using individual DB variables')
  } else {
    throw new Error('No database configuration found')
  }

  // Add connection timeout settings
  config.connectionTimeoutMillis = 10000
  config.idleTimeoutMillis = 30000
  config.max = 1 // Single connection for serverless

  console.log('Creating database pool with config:', {
    host: config.host || 'from connection string',
    database: config.database || 'from connection string',
    port: config.port || 'from connection string',
  })

  pool = new Pool(config)

  pool.on('error', (err) => {
    console.error('Database pool error:', err)
    pool = null
  })

  return pool
}

export default createPool()
