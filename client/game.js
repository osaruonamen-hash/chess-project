const socket = io('http://localhost:3000'); // Or your deployed URL

const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: function (source, target) {
    const move = game.move({
      from: source,
      to: target,
      promotion: 'q' // auto-promote to queen
    });

    if (move === null) return 'snapback';

    socket.emit('move', move);
  }
});

socket.on('move', (move) => {
  game.move(move);
  board.position(game.fen());
});
