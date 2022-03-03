import express from 'express';
import loginRouter from './routes/login';

const app = express();

app.use(loginRouter);

export default app;
