import express from 'express';
import dotenv from 'dotenv';
const app = express();
import ConnectDB from './config/db.js';
import Routes from './routes/index.js';

dotenv.config();

app.use(express.json());

ConnectDB();

// routes
app.use('/', Routes);

export { app };
