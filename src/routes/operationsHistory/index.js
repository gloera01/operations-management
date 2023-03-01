import { Router } from 'express';
import { ADMIN, SUPERADMIN } from '../../constants/roles';
import controller from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';
import requirePermissions from '../../middlewares/requirePermissions';
import requireAuth from '../../middlewares/requireAuth';

const router = Router({ mergeParams: true }).get(
  '/',
  requireAuth,
  requirePermissions([ADMIN, SUPERADMIN]),
  withHttpResponse(controller.get)
);

export default router;
