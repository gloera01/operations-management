import { Router } from 'express';
import usersController from './controller';

import withHttpResponse from '../../middlewares/withHttpResponse';
// import permissions middleware

const router = Router().post('/', withHttpResponse(usersController.create));

// TODO:
// get by id
// patch user endpoint
// delete user (inactivate)

export default router;
