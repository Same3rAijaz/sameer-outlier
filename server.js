const http = require('http')

const PORT = process.env.PORT || 3000


// User Agent Function Start
const setUserAgent = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent']
    res.end(JSON.stringify({ userAgent }))
  } catch (err) {
    res.statusCode(400).end(JSON.stringify({ msg: "Something Went Wrong!" }))
  }
}
// User Agent Function End

// Respond to Base 64 Start 
const base64Respond = async (req, res) => {
  const phrase = req.url.replace(/^\/b64\//, '')
  res.end(JSON.stringify({ b64: Buffer.from(phrase).toString('base64') }))
}
//Respond to Base 64 End 

// Url IMplementation
const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      return respondHello(req, res)
      break;
    case "/user-agent":
      return setUserAgent(req, res)
      break;
    default:
      if (req.url.match(/^\/b64\//)) {
        return base64Respond(req, res);
      } else {
        return res.end(JSON.stringify({ msg: "Bad Request!" }))
      }
      break;
  }
  res.end()
})
// Url IMplementation





function respondHello(req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

// Hello World Function Start
server.listen(PORT)
console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
// Hello World Function End