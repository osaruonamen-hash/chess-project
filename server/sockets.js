module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('New client:', socket.id);

    socket.on('joinGame', (data) => {
      socket.join(data.room);
      socket.to(data.room).emit('playerJoined', { id: socket.id });
    });

    socket.on('move', ({ room, move }) => {
      socket.to(room).emit('moveMade', move);
    });

    socket.on('chatMessage', ({ room, message }) => {
      socket.to(room).emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
