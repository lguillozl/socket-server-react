const express  = require('express');                                            // Express server
const http     = require('http');                                               // Sockets server
const socketio = require('socket.io');
const path     = require('path');
const Sockets  = require('./sockets');

class Server {
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);                              // Http server
        this.io = socketio(this.server, { /* Config */ });                      // Socket server configuration
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));     // Deploying public directory
    }

    socketsConfig(){
        new Sockets(this.io)
    }

    execute(){
        this.middlewares();                                                     // Middlewares init
        this.socketsConfig();                                                   // Sockets init
        this.server.listen(this.port, () => {                                   // Server init
            console.log('Server running on port:', this.port);
        });
    }
}

module.exports = Server;