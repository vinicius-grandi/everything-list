import logger from 'jet-logger';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';

const port = process.env.PORT || 5001;
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  logger.info('connection successful');
  socket.on('disconnect', () => {
    logger.imp('disconnection successful');
  });
});

server.listen(port, () => {
  logger.info(`app listening on port: ${port}`);
});

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});
