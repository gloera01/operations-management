import { Router } from 'express';
import 'express-async-errors';
import { basePath } from '../../config.js';

import auth from './auth';
import users from './users';

import requireAuth from '../middlewares/requireAuth.js';

const routes = Router();

routes.use(`${basePath}/auth`, auth);
routes.use(`${basePath}/users`, requireAuth, users);

export default routes;
