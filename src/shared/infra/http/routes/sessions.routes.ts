import { Router } from 'express';
import AuthenticationUserService from '../../../../modules/users/services/AuthenticationUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUserService = new AuthenticationUserService();

  const { user, token } = await authenticationUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
