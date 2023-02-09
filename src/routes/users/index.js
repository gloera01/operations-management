import { Router } from 'express';
import { ADMIN, SUPERADMIN } from '../../constants/roles';
import usersController from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';
import requirePermissions from '../../middlewares/requirePermissions';

const router = Router().post(
  '/',
  requirePermissions([ADMIN, SUPERADMIN]),
  withHttpResponse(usersController.create)
);

// TODO:
// get by id
// patch user endpoint
// delete user (inactivate)

export default router;
