import UserService from './signup/userService';
import AdminService from './signup/adminService';
import roles from '../constants/roles';

export const createService = (
  role,
  userModel,
  responseHandler,
  passwordService
) => {
  if (role === roles.ADMIN)
    return new AdminService(userModel, responseHandler, passwordService);

  if (role === roles.USER)
    return new UserService(userModel, responseHandler, passwordService);

  throw new Error('Role not supported');
};

export default { createService };
