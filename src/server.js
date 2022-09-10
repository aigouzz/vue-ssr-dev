const express = require('express')
const Vue = require('vue')
const serverRender = require('vue/server-renderer')
const server = express()

server.get('/', (req, res) => {
  const app = Vue.createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  serverRender.renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3001, () => {
  console.log('ready')
})