const express = require('express');
const app = express();
const server = require('http').createServer(app);
const options = {
    allowUpgrades: true,
    transports: [ 'polling', 'websocket' ],
    pingTimeout: 9000,
    pingInterval: 3000,
    cookie: 'iocookie',
    httpCompression: true,
    origins: '*:*'
};
const io = require('socket.io')(server, options);


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});
let users = {};

io.on('connection', client => {
    console.log({type: 'connection', id: client.id});

    client.on('user', username => {
        users[client.id] = username;
        console.log({type: 'user', id: client.id, username});
        client.broadcast.emit('info', {type: 'login', content: username});
        io.emit('info', {type: 'users-list', content: formatList(users)});
    });

    client.on('disconnect', () => {
        let username = users[client.id];
        console.log({type: 'disconnection', id: client.id, username: users[client.id]});
        io.emit('info', {type: 'logout', content: username});
        delete users[client.id];
        io.emit('info', {type: 'users-list', content: formatList(users)});
    });

});

function formatList(list) {
    let formatted = [];
    for (let i in list) {
        formatted.push(list[i]);
    }
    return formatted;
}

server.listen(3000, () => {
    console.log('******Server started');
})
