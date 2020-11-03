const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

io.on('connect', socket => {
   console.log('User connected');

    socket.on('message', message => {
        console.log(message);
        io.emit('message', message)
    })
    socket.on('disconnect', () => {
        console.log('User disconnected')
    });
});


server.listen(3000, () => {
    console.log('Server started');
})
