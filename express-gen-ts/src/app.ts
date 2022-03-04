import express from 'express';
import loginRouter from './routes/login';
import './database'

const app = express();

app.use(express.json());
app.use(loginRouter);

export default app;
