import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import dbConfig from './config/db';
import authRouter from './routes/authRoutes';
import globalErrorHandler from './controllers/errorController';
dotenv.config();

dbConfig();

const app = express();

// body -parser
app.use(express.json());

//development loggings
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use('/api/v1', authRouter);

app.use(globalErrorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
