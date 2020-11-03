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
app.get('/compteur', (req, res) => {
    res.sendFile(`${__dirname}/public/compteur.html`);
});
let users = {};
let count = 0;
io.on('connect', socket => {

    socket.on('addCount', () => {
        count++;
        io.emit('newCount', count);
    })

    socket.on('username', username => {
        users[socket.id] = username;
        socket.broadcast.emit('broadcast', username + ' is now connected');
        io.emit('users', users);
    });
    socket.on('message', message => {
        socket.broadcast.emit('message', {username: users[socket.id], message});
    })

    socket.on('disconnect', () => {
        if (users[socket.id] !== undefined) {
            socket.broadcast.emit('broadcast', users[socket.id] + ' is now disconnected');
            delete users[socket.id];
        }
        socket.broadcast.emit('users', users);
    });
});


server.listen(3000, () => {
    console.log('Server started');
})
