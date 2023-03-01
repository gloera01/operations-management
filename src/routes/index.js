import { Router } from 'express';
import 'express-async-errors';
import { basePath } from '../../config.js';

import auth from './auth';
import users from './users';
import accounts from './accounts';
import accountMemmbers from './accountMembers';
import operationsHistory from './operationsHistory';

const routes = Router();

routes.use(`${basePath}/auth`, auth);
routes.use(`${basePath}/users`, users);
routes.use(`${basePath}/accounts`, accounts);
routes.use(`${basePath}/accounts/:accountId/members`, accountMemmbers);
routes.use(`${basePath}/accounts/:accountId/operations`, operationsHistory);

export default routes;
