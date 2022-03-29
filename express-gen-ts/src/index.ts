import logger from 'jet-logger';
import app from './app';

const port = process.env.PORT || 5001;
app.listen(port, () => {
  logger.info(`app listening on port: ${port}`);
});
