import { NextResponse } from 'next/server'

export async function GET() {
  let dbStatus = 'disconnected'
  let dbError = null
  let connectionAttempt = null

  // Show all environment variable values (redact sensitive data)
  const envDebug = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL
      ? `postgresql://**:***@${process.env.DB_URL.split('@')[1]}`
      : 'MISSING',
    DB_HOST: process.env.DB_HOST || 'MISSING',
    DB_USER: process.env.DB_USER || 'MISSING',
    DB_NAME: process.env.DB_NAME || 'MISSING',
    DB_PORT: process.env.DB_PORT || 'MISSING',
    DB_PASSWORD: process.env.DB_PASSWORD ? 'SET' : 'MISSING',
    // Show all environment keys for debugging
    ALL_ENV_KEYS: Object.keys(process.env).filter(
      (key) => key.startsWith('DB_') || key === 'DB_URL'
    ),
  }

  console.log('Environment Debug:', envDebug)

  // Check if we have any database configuration
  const hasConfig =
    process.env.DB_URL ||
    (process.env.DB_HOST &&
      process.env.DB_USER &&
      process.env.DB_PASSWORD &&
      process.env.DB_NAME)

  if (!hasConfig) {
    dbError = 'No database configuration found in environment variables'
  } else {
    try {
      const { Pool } = await import('pg')

      let config

      if (process.env.DB_URL) {
        config = {
          connectionString: process.env.DB_URL,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000,
        }
        connectionAttempt = {
          type: 'DB_URL',
          url: process.env.DB_URL.replace(/:[^:]*@/, ':***@'),
        }
      } else {
        config = {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: parseInt(process.env.DB_PORT) || 5432,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000,
        }
        connectionAttempt = {
          type: 'individual_vars',
          host: config.host,
          port: config.port,
          database: config.database,
          user: config.user,
        }
      }

      console.log('Attempting database connection:', connectionAttempt)

      const pool = new Pool(config)
      const client = await pool.connect()

      const result = await client.query(
        'SELECT NOW() as current_time, version() as pg_version'
      )
      console.log('Database connection successful:', result.rows[0])

      client.release()
      await pool.end()

      dbStatus = 'connected'
    } catch (error) {
      console.error('Database connection error:', error)
      dbError = `${error.message} (Code: ${error.code || 'N/A'})`
    }
  }

  return NextResponse.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      error: dbError,
      connectionAttempt,
      envDebug,
    },
  })
}
