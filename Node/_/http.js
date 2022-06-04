const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type' : 'text/javascript'})
    res.write('Hello, World!')
    res.end()
})

server.on('listening', () => {})

server.on('error', err => {})

server.on('close', () => {})

server.listen(8000)