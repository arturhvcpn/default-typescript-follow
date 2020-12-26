import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import CreateUsersService from '../services/CreateUsersService';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUsersService = new CreateUsersService();

  const user = await createUsersService.execute({ name, email, password });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);
export default usersRouter;
