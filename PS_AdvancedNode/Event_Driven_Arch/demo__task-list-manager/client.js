/*
help,ls,add,delete
*/

const EventEmitter = require('events')
const ReadLine = require('readline')


const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new EventEmitter();
const server = require('./server')(client);

// echo to console
rl.on('line', function(line){
    client.emit('command',line);
})

server.on('response', (resp) => {
    console.log(`Resp: ${resp}`);
})
