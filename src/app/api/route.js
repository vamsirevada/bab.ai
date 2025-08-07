import { NextResponse } from 'next/server'

export async function GET() {
  let dbStatus = 'disconnected'
  let dbError = null
  let connectionAttempt = null

  // Check if all required environment variables are present
  const envCheck = {
    DB_HOST: !!process.env.DB_HOST,
    DB_USER: !!process.env.DB_USER,
    DB_PASSWORD: !!process.env.DB_PASSWORD,
    DB_NAME: !!process.env.DB_NAME,
    DB_PORT: !!process.env.DB_PORT,
  }

  const missingEnvVars = Object.entries(envCheck)
    .filter(([key, value]) => !value)
    .map(([key]) => key)

  if (missingEnvVars.length > 0) {
    dbError = `Missing environment variables: ${missingEnvVars.join(', ')}`
  } else {
    try {
      // Dynamic import to avoid build issues
      const { Pool } = await import('pg')

      const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT) || 5432,
        ssl: {
          rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 5000, // 5 seconds timeout
      }

      connectionAttempt = {
        host: config.host,
        port: config.port,
        database: config.database,
        user: config.user,
      }

      console.log('Attempting database connection to:', connectionAttempt)

      const pool = new Pool(config)
      const client = await pool.connect()

      // Test query
      const result = await client.query('SELECT NOW() as current_time')
      console.log('Database query result:', result.rows[0])

      client.release()
      await pool.end()

      dbStatus = 'connected'
    } catch (error) {
      console.error('Database connection error:', error)
      dbError = error.message

      // More specific error information
      if (error.code) {
        dbError += ` (Code: ${error.code})`
      }
    }
  }

  const responseData = {
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus,
      error: dbError,
      connectionAttempt,
      envCheck,
    },
  }

  return NextResponse.json(responseData, {
    status: dbStatus === 'connected' ? 200 : 500,
  })
}
