const express = require('express');
const socketio = require('socket.io');

const PORT = 65080;

const app = express();
app.use(express.static(__dirname + '/public'));
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

const server = app.listen(PORT);
const io = socketio(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('caregiver', (data) => {
        socket.emit('elderly', data);
    });

    socket.on('elderly', (data) => {
        socket.emit('caregiver', data);
    });

});
