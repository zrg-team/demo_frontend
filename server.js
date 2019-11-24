const express = require('express')
const { parse } = require('url') // eslint-disable-line
const next = require('next')
const fs = require('fs')
const { promisify } = require('util')
const cookieParser = require('cookie-parser')

const readFileAsync = promisify(fs.readFile)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.use(cookieParser())
  // server.get('/test/:id', (req, res) => {
  //   const actualPage = '/test'
  //   const queryParams = { title: req.params.id }
  //   app.render(req, res, actualPage, queryParams)
  // })

  server.get('/dashboard/', async (req, res) => {
    const file = await readFileAsync('static/admin/index.html')
    res.end(file)
  })
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    return handle(req, res, parsedUrl)
  })
  server.listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
