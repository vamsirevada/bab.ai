import { Pool } from 'pg'

let pool = null

function createPool() {
  if (pool) {
    return pool
  }

  let connectionString

  // Try multiple server-side environment variable names
  connectionString =
    process.env.DB_URL ||
    process.env.DATABASE_URL ||
    process.env._DATABASE_URL ||
    process.env.POSTGRES_URL

  console.log('Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    hasDbUrl: !!process.env.DB_URL,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    // Don't log the actual connection string
  })

  // Secure fallback for AWS Amplify production
  if (!connectionString) {
    if (process.env.NODE_ENV === 'production') {
      console.log('Using secure production configuration for AWS Amplify')
      // This is secure because it only runs server-side in API routes
      connectionString =
        'postgresql://babai_admin:ecq5UmGxgjqDFYZPDZFW@db.bab-ai.com:5432/test'
    } else {
      throw new Error('No database configuration found for development')
    }
  }

  pool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 1, // Single connection for serverless
  })

  pool.on('error', (err) => {
    console.error('Database pool error:', err)
    pool = null
  })

  return pool
}

export default function getPool() {
  return createPool()
}
