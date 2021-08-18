class Sockets {

    constructor(io){
        this.io = io;
        this.socketEvents();                                     // Calling socketEvent
    }

    socketEvents(){
        this.io.on('connection', (socket) => {                   // On connection

            // Listening event: message-to-server
            socket.on('message-to-server', (data) => {
                console.log(data)
                this.io.emit('message-from-server', data)
            })
        
        });
    }
}

module.exports = Sockets;