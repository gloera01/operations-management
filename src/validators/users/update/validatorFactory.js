import { ADMIN, USER, SUPERADMIN } from '../../../constants/roles';

import adminValidator from './updateAdmin';
import userValidator from './updateUser';

const createValidator = (userType) => {
  if (userType === USER) return userValidator;
  if (userType === ADMIN) return adminValidator;
  if (userType === SUPERADMIN) return adminValidator;

  throw new Error('Provided role is not supported.');
};

export default { createValidator };
