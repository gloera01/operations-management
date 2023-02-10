import { Router } from 'express';
import { ADMIN, SUPERADMIN } from '../../constants/roles';
import usersController from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';
import requirePermissions from '../../middlewares/requirePermissions';
import requireAuth from '../../middlewares/requireAuth';

const router = Router().post(
  '/',
  requireAuth,
  requirePermissions([ADMIN, SUPERADMIN]),
  withHttpResponse(usersController.create)
);

// TODO:
// get by id
// patch user endpoint
// delete user (inactivate)

export default router;
