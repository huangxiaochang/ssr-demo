import express form "express"
import fs from 'fs'
import path from "path"

const app = express()
// const router = require("./router/index.js")

// static resource path
// app.use(express.static(path.join(__dirname, "public")))

// template engine
// app.engine("html", require("ejs").__express)
// app.set("view engine", "html")
// app.set("views", path.join(__dirname, "views"))

const projRoot = path.resolve(__dirname, '..')
const resolve = (p) => path.resolve(projRoot, p)

// router
app.use("*", async (req, res) => {
  const html = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
})

const port = 3004
const server = app.listen(port, function (request, response) {
  console.log("your server running at http://localhost:%s", port)
})



