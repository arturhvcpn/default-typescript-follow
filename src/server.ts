import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

app.get('/', (request, response) => {
  return response.json({
    message:
      'this is default design pattern with basic dependecies project in node/ts',
  });
});

app.listen(3333, () => {
  console.log('Server started in port 3333');
});
