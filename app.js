const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
let users = {};
io.on('connect', socket => {
    socket.on('username', username => {
        users[socket.id] = username;
        socket.broadcast.emit('broadcast', username + ' is now connected');
    });
    socket.on('message', message => {
        socket.broadcast.emit('message', {username: users[socket.id], message});
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('broadcast', users[socket.id] + ' is now disconnected');
    });
});


server.listen(3000, () => {
    console.log('Server started');
})
