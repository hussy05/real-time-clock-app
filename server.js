const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { updateClock } = require('./src/clock');
const { connect } = require('http2');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A client connected');

  // Update time every second and send it to the client
  const intervalId = setInterval(() => {
    const time = updateClock();
    socket.emit('time', { time });
  }, 1000);
console.log(intervalId);
  // Disconnect event handling
  socket.on('disconnect', () => {
    console.log('A client disconnected');
    clearInterval(intervalId);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
