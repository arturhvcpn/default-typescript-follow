import 'reflect-metadata';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import routes from './shared/routes';
import uploadConfig from './config/upload';
import './shared/database';
import AppError from './shared/errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
