import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'  
import studentsRoute from './students/students.route.js'
import { initializeDatabase } from './config/init-db.js'

const app = new Hono()

app.use('*', cors({
  origin: 'http://localhost:4200', 
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
}))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/students', studentsRoute)

// Initialize database before starting server
try {
  await initializeDatabase()
} catch (error: any) {
  console.error('Failed to initialize database:', error.message)
  // Continue anyway - table might already exist
}

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)