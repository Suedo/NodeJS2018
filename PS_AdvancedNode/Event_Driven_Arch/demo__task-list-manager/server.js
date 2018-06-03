const EventEmitter = require('events')
const ReadLine = require('readline')

// TODO: This doesn't work. 'this[command]();' fails
// need to fix this
class Server extends EventEmitter {
    constructor(client) {
        super();
        client.on('command', function c(command) {
            console.log('in cons');
            switch (command) {
                case 'help':
                case 'ls':
                case 'add':
                case 'delete':
                    console.log('in case');
                    this[command]();
                    break;

                default:
                    console.log('in cons');
                    this.emit('response', 'unkown...');
                    break;
            }
        });
    }
    help() {
        this.emit('response', 'help...');
    }
    ls() {
        this.emit('response', 'ls...');
    }
    add() {
        this.emit('response', 'add...');
    }
    delete() {
        this.emit('response', 'delete...');
    }
}

function server(client) {
    return new Server(client);
}

module.exports = server;