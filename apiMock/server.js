const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
  })
}

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})