const jsonServer = require('json-server')
const pause = require('connect-pause');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
  })
}

server.use(pause(1000))
server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})