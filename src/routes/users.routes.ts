import { Router } from 'express';
import CreateUsersService from '../services/CreateUsersService';
const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUsersService = new CreateUsersService();

    const user = await createUsersService.execute({ name, email, password });

    delete user.password;

    return response.json(user);
});

export default usersRouter;
