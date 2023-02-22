import { Router } from 'express';
import { ADMIN, SUPERADMIN, USER } from '../../constants/roles';
import usersController from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';
import requirePermissions from '../../middlewares/requirePermissions';
import requireAuth from '../../middlewares/requireAuth';

const router = Router()
  .post(
    '/',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN]),
    withHttpResponse(usersController.create)
  )
  .patch(
    '/:userId',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN]),
    withHttpResponse(usersController.update)
  )
  .get(
    '/',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN, USER]),
    withHttpResponse(usersController.get)
  );

export default router;
