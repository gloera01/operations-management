import { Router } from 'express';
import controller from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';

const router = Router().post('/login', withHttpResponse(controller.login));

export default router;
