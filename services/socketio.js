const io = require('socket.io')();

io.on('connect', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        console.log('message:', message);

        io.emit('new message', { message: message });
    });

});

module.exports = io
