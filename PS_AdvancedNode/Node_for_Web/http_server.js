const server = require('http').createServer(); // http.server

server.on('request', (req,res) => {
  // req : http.IncomingMessage
  // res : http.ServerResponse
  res.writeHead(200, { 'content-type' : 'text/plain' });
  res.end();
})
