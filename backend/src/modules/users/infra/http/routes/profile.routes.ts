import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';

const usersRouter = Router();
const profileController = new ProfileController();

usersRouter.use(ensureAuthenticated);

usersRouter.get('/', profileController.show);
usersRouter.put('/', profileController.update);

export default usersRouter;
