import express from 'express';
import dotenv from 'dotenv';
import dbConfig from './config/db';
import authRouter from './routes/authRoutes';
dotenv.config();

dbConfig();

const app = express();

// body -parser
app.use(express.json());

app.use('/api/v1', authRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
