import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import createConnection from './database';
import routes from './routes';
import AppError from './Errors/AppError';

createConnection();

const app = express();

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, nextFunction: NextFunction) => {
    if(error instanceof AppError) {
        return response.json({ error: error.message }).status(error.statusCode);
    }
    
    return response.json({ error: `Internal server error: ${error.message}` }).status(500);
});

export default app;