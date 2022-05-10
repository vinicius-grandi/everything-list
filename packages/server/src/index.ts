import logger from 'jet-logger';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';

const port = process.env.PORT || 5001;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://googleads.g.doubleclick.net/pagead/id',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  logger.info('connection successful');
  socket.on('disconnect', () => {
    logger.imp('disconnection successful');
  });

  socket.on('review', (arg) => {
    socket.join(arg);
    io.to(arg).emit(
      'review',
      'There are new reviews, click the button above to refresh reviews',
    );
  });
});

server.listen(port, () => {
  logger.info(`app listening on port: ${port}`);
});

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});
