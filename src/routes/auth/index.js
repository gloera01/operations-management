import { Router } from 'express';
import controller from './controller';

const router = Router().post('/login', controller.login);

export default router;
