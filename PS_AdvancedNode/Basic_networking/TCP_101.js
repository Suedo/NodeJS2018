const server = require('net').createServer();
var counter = 0;
var sockets = {
    // id : socket
} 

server.on('connection', socket => {
    socket.id = counter++; // each client id

    if (!sockets[socket.id]) { // new client
        clog('Welcome! Please enter your name: ');
    }

    socket.on('data', data => {

        data = data.toString().trim();

        if (!socket.name) {
            // new joinee specific code
            socket.name = data;
            sockets[socket.id] = socket; // register. 
            slog(`${socket.name} joined!`);
        } else {
            // broadcast to other sockets what this socket entered
            Object.entries(sockets).forEach(([, otherSocket]) => {
                if(!(otherSocket.id === socket.id)){
                    clog(`${socket.name}: ${data}\n`, otherSocket);
                }                
            });
        }

    })

    socket.on('end', () => {
        slog(`${socket.name} left`);
        delete sockets[socket.id]
    })

    //write to server
    function slog(data) {
        console.log(`S: ${data}`);
    }
    //write to client
    function clog(data, specificSocket) {
        if (specificSocket) {
            specificSocket.write(`C: ${data}`);
        }else{
            socket.write(`C: ${data}`);
        }        
    }
})

server.listen(8000, () => console.log('server listening on port 8000'));