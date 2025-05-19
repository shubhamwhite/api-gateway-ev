
const gateway = require('fast-gateway')
const color = require('./helper/color.helper')

const port = 4000
const server = gateway({
  routes: [
    {
      prefix: '/api/v1/company',
      target: 'http://localhost:3005/',
      hooks: {
        onRequest (req, res) {
          console.log(`Request received: ${req.method} ${req.url}`)
        }
      }
    },
    {
      prefix: '/api/v1/auth',
      target: 'http://localhost:3004/',
      hooks: {
        onRequest (req, res) {
          console.log(`Request received: ${req.method} ${req.url}`)
        }
      }
    }
  ]
})

server.get('/gateway',(req,res) => {
  res.send('gateway is running')
})

;(async () => {
  try {
    // Optional: DB connection (if needed)
    // await connectDB();

    await server.start(port)
    color.success(`api-gateway server is running on ${port} number`)
  } catch (err) {
    color.error('Error starting api-gateway server:', err)
    process.exit(1)
  }
})()
