import { Router } from 'express';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticationUserService = new AuthenticationUserService(
    usersRepository,
  );

  const { user, token } = await authenticationUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
