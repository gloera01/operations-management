import { Router } from 'express';
import controller from './controller';
import { SUPERADMIN, ADMIN } from '../../constants/roles';

import withHttpResponse from '../../middlewares/withHttpResponse';
import requirePermissions from '../../middlewares/requirePermissions';
import requireAuth from '../../middlewares/requireAuth';

const router = Router({ mergeParams: true })
  .post(
    '/',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN]),
    withHttpResponse(controller.create)
  )
  .get(
    '/',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN]),
    withHttpResponse(controller.get)
  )
  .delete(
    '/:userId',
    requireAuth,
    requirePermissions([ADMIN, SUPERADMIN]),
    withHttpResponse(controller.remove)
  );
export default router;
