import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

import ConnectDB from './config/db.js';
import Routes from './routes/index.js';

app.use(express.json());

ConnectDB();

// routes
app.use('/demo', Routes);

export { app };
