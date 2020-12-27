import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticationUserService from '@modules/users/services/AuthenticationUserService';

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationUserService = container.resolve(
      AuthenticationUserService,
    );
    const { user, token } = await authenticationUserService.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
