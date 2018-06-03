const dgram = require('dgram');
const PORT = 3333;
const HOST = '127.0.0.1';


// Server
const server = dgram.createSocket('udp4').bind(PORT, HOST);

server.on('listening', () => {
    console.log(`Server listening on ${HOST}:${PORT}...`);
})

server.on('message', (msg, info) => {
    console.log(`${info.address}:${info.port} - ${msg}`);
})

// Client
const client = dgram.createSocket('udp4');
client.send('UDP test', PORT, HOST, (err) => {
    if (err) throw err;
    console.log('message sent from client');
    client.close();
})

/**
 * Prints:
 * Server listening on 127.0 .0 .1: 3333...
 * message sent from client
 * 127.0 .0 .1: 45687 - UDP test
 */