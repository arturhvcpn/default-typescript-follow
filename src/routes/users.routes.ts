import { Router } from 'express';
import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUsersService = new CreateUsersService();

    const user = await createUsersService.execute({ name, email, password });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
