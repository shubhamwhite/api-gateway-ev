const gateway = require('fast-gateway')
const color = require('./helper/color.helper')
const config = require('./config')
const port = config.get('PORT') || 5000

const server = gateway({
  routes: [
    {
      prefix: config.get('COMPANY_PREFIX'),
      target: config.get('COMPANY_TARGET'),
      hooks: {
        onRequest(req, res) {
          color.bold(`Request received: ${req.method} ${req.url}`)
        }
      }
    },
    {
      prefix: config.get('AUTH_PREFIX'),
      target: config.get('AUTH_TARGET'),
      hooks: {
        onRequest(req, res) {
          color.bold(`Request received: ${req.method} ${req.url}`)
        }
      }
    }
  ]
})

server.get('/gateway', (req, res) => {
  res.send('gateway is running')
})

;(async () => {
  try {
    await server.start(port)
    color.success(`api-gateway server is running on ${port} number`)
  } catch (err) {
    color.error('Error starting api-gateway server :', err)
    process.exit(1)
  }
})()
