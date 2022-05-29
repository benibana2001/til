const http = require('http')

const server = http.createServer()

server.on('request', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('Hello World')
    res.end()
})

server.on('listening', () => {
    console.log('listen')
})

server.on('error', () => {
    console.log('error')
})

server.on('close', () => {
    console.log('close')
})
server.listen(8000)