import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './config/db';

dotenv.config();

dbConfig();

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
